import axios from 'axios';

export default async function getPokemonById() {
  const name = 'pikachu';
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
