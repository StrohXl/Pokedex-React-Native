import { getData } from "@/services/getData";
import { Pokemon } from "@/types/pokemon.type";
import { GetPokemons } from "@/types/pokemons.type";
import axios, { AxiosResponse } from "axios";

const getPokemon = async ({
  pageOffset = 0,
  states,
  limit,
}: {
  pageOffset: number;
  states: {
    pokemon: Pokemon[];
    setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    morePage: boolean;
    setMorePage: React.Dispatch<React.SetStateAction<boolean>>;
  };
  limit: number;
}) => {
  const { loading, morePage, setLoading, setMorePage, setOffset, setPokemon } =
    states;

  if (loading && !morePage) return;
  setLoading(true);

  try {
    const data = await getData<GetPokemons>({
      endPoint: "pokemon",
      offset: pageOffset,
      limit,
    });
    const dataPokemons = data.data.results;
    const fetchPokemons = dataPokemons.map((pokemon) => axios.get(pokemon.url));
    const listaCompletaConDatos: AxiosResponse<Pokemon>[] =
      await Promise.all(fetchPokemons);
    setMorePage(Boolean(data.data.next));
    setOffset((prev) => prev + limit);
    const pokemonsDetails = listaCompletaConDatos.map((item) => item.data);
    setPokemon((prev) => [...prev, ...pokemonsDetails]);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
export default getPokemon;
