import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { Pokemon } from '../models/Pokemon';

export default function Empoleon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 1000,
    headers: {},
  });

  async function getPokemonByName() {
    const name = 'empoleon';
    try {
      setLoading(true);
      const response = await instance.get(`pokemon/${name}`);
      setError(null); // Resetea el error si la petición es exitosa
      return response.data;
    } catch (error) {
      setError('Error al obtener la información de Empoleon');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: 'lightblue',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={async () => {
          const empoleon: Pokemon = await getPokemonByName();
          setPokemon(empoleon);
        }}>
        <Text style={{ color: 'black' }}>Buscar info de Empoleon</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          {pokemon && (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ textAlign: 'center', marginBottom: 10 }}>
                La información se obtuvo usando una instancia de axios. Si quisiera más info, podría agregar más botones
                y con la misma instancia obtener otros pokemones.
              </Text>
              <Text>Nombre: {pokemon.name}</Text>
              <Text>Peso: {pokemon.weight}</Text>
              <Text>Altura: {pokemon.height}</Text>
              <Text>Experiencia base: {pokemon.base_experience}</Text>
              <Image
                style={{ width: 100, height: 100, marginTop: 10 }}
                source={{ uri: pokemon.sprites.front_default }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}
