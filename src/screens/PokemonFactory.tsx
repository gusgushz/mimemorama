import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

// Factory Method: Crear Pokémon
class PokemonFactory {
  static createPokemon(name: string, weight: number, height: number, image: string) {
    return new Pokemon(name, weight, height, image);
  }
}

class Pokemon {
  constructor(public name: string, public weight: number, public height: number, public image: string) {}

  getDescription() {
    return `${this.name}. Pesa ${this.weight}kg y es ${this.height}metros de alto.`;
  }
}

// Decorator: Agregar habilidades extras al Pokémon
class PokemonWithAbilities extends Pokemon {
  constructor(pokemon: Pokemon, public abilities: string[]) {
    super(pokemon.name, pokemon.weight, pokemon.height, pokemon.image);
  }

  getAbilities() {
    return `Habilidades: ${this.abilities.join(', ')}`;
  }
}

// Observer: Notificar cambios a las partes interesadas
class PokemonObserver {
  private observers: ((pokemon: Pokemon) => void)[] = [];

  subscribe(callback: (pokemon: Pokemon) => void) {
    this.observers.push(callback);
  }

  notify(pokemon: Pokemon) {
    this.observers.forEach(callback => callback(pokemon));
  }
}

export default function PokemonScreen() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [observer] = useState(new PokemonObserver());
  const [history, setHistory] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nameRef = useRef<TextInput>(null);

  useEffect(() => {
    observer.subscribe(updatedPokemon => {
      // Cada vez que el observer se notifique, agrega la descripción al historial
      setHistory(prevHistory => [...prevHistory, updatedPokemon.name]);
    });
  }, [observer]);

  const fetchPokemon = async (name: string) => {
    try {
      setLoading(true);
      setPokemon(null);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      const data = await response.json();
      // Usamos el Factory Method para crear un Pokémon
      const newPokemon = PokemonFactory.createPokemon(
        data.name,
        data.weight / 10,
        data.height / 10,
        data.sprites.front_default
      );
      if (error != '') setError('');
      setPokemon(newPokemon);
      observer.notify(newPokemon); // Notificar a los observadores
      setLoading(false);
    } catch (error) {
      setError('Error buscando ese Pokémon, intenta con otro nombre');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Text style={styles.title}>Pokemon Info</Text>
        {error && <Text style={{ color: 'red', fontWeight: 'bold' }}>{error}</Text>}
        <TextInput style={styles.inputText} ref={nameRef} editable={!loading} onChangeText={setName} value={name} />
        <View style={{ width: '100%' }}>
          {loading ? (
            <ActivityIndicator size="small" color="lightblue" />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                if (name.trim()) {
                  nameRef.current?.clear();
                  await fetchPokemon(name);
                }
              }}>
              <Text style={{ textAlign: 'center' }}>Buscar Pokémon</Text>
            </TouchableOpacity>
          )}
        </View>

        {pokemon && (
          <View style={styles.pokemonContainer}>
            <Text style={styles.text}>{pokemon.getDescription()}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
            {pokemon instanceof PokemonWithAbilities ? (
              <Text style={styles.text}>{pokemon.getAbilities()}</Text>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (pokemon) {
                    const enhancedPokemon = new PokemonWithAbilities(pokemon, ['Blaze', 'Solar Power']);
                    observer.notify(enhancedPokemon);
                    setPokemon(enhancedPokemon);
                  }
                }}>
                <Text style={{ textAlign: 'center' }}>Agregar habilidades</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>

      {/* Mostrar historial del Observer */}
      <View style={styles.historyContainer}>
        <Text style={styles.title}>Historial</Text>
        <FlatList
          inverted
          data={history}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => <Text style={styles.historyText}>- {item}</Text>}
          showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
          indicatorStyle="white"
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  inputText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  pokemonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  historyContainer: {
    maxHeight: 200,
    backgroundColor: 'lightgrey',
    paddingHorizontal: 16,
    borderRadius: 16, // Opcional: redondea las esquinas superiores
  },
  historyText: {
    fontSize: 14,
    marginVertical: 4,
  },
});
