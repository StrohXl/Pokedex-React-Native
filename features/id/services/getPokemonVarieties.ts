import { getData } from "@/services/getData";
import { Pokemon } from "@/types/pokemon.type";
import { StatesType } from "../types/states.type";

export default async function getPokemonVarieties({
  states,
  urlPokemon,
}: {
  states: StatesType;
  urlPokemon: string;
}) {
  const { setLoading, setPokemonData } = states;

  const idVariant = new URL(urlPokemon).pathname
    .split("/")
    .filter(Boolean)
    .pop();
  setLoading(true);

  try {
    const promises = [
      getData({
        endPoint: `/pokemon/${idVariant}`,
      }),
    ];
    const [res1] = await Promise.all(promises);
    const pokemonVariant = res1.data as Pokemon;
    setPokemonData((prev) => ({
      ...prev,
      default: pokemonVariant,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
