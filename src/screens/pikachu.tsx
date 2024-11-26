import { useEffect, useState } from 'react';
import getPokemonById from '../api/getPokemonById';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';

type Pokemon = {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
};

export default function PikachuScreen() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonById();
        setPokemon(data);
      } catch (err) {
        setError('Error al cargar la información del Pokémon');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      {pokemon && (
        <>
          <Text style={styles.body2}>
            La información se obtuvo con una función al construir esta pantalla, y cada vez que se salga y vuelva a
            entrar se vuelve a llamar a la función. Se puede llamar n veces a la misma función para obtener la
            información de diferentes pokemons.
          </Text>
          <Text style={styles.title}>{pokemon.name}</Text>
          <Text style={styles.body}>Peso: {pokemon.weight}</Text>
          <Text style={styles.body}>Altura: {pokemon.height}</Text>
          <Text style={styles.body}>Experiencia base: {pokemon.base_experience}</Text>
          <Image source={{ uri: pokemon.sprites.front_default }} style={styles.image} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 18,
  },
  body2: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
