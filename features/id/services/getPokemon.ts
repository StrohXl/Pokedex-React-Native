import { getData } from "@/services/getData";
import { PokemonSpecies } from "@/types/pokemon-species.type";
import { Pokemon } from "@/types/pokemon.type";
import { AudioPlayer } from "expo-audio";
import { StatesType } from "../types/states.type";
import loadSound from "../utils/loadSound";

export default async function getPokemon({
  states,
  idPokemon,
  player,
}: {
  states: StatesType;
  idPokemon: string;
  player: AudioPlayer;
}) {
  const { setId, setLoading, setNameDefault, setPokemonData } = states;
  const currentId = Number(idPokemon);
  setId(idPokemon);
  setLoading(true);
  try {
    const promises = [
      getData<PokemonSpecies>({ endPoint: `/pokemon-species/${idPokemon}` }),
      getData<Pokemon>({ endPoint: `/pokemon/${idPokemon}` }),
      getData<Pokemon>({ endPoint: `/pokemon/${currentId + 1}` }),
    ];
    if (currentId > 1)
      promises.push(
        getData<Pokemon>({ endPoint: `/pokemon/${currentId - 1}` }),
      );
    const [speciesRes, defaultRes, nextRes, prevRes] =
      await Promise.all(promises);

    const species = speciesRes.data as PokemonSpecies;
    const varieties = species.varieties;

    const fetchs = {
      default: defaultRes.data as Pokemon,
      prev: prevRes ? (prevRes.data as Pokemon) : undefined,
      next: nextRes.data as Pokemon,
      species: speciesRes?.data as PokemonSpecies,
      varieties,
    };
    setNameDefault(defaultRes.data.name);
    setPokemonData(fetchs);
    loadSound({ player, id: idPokemon });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
