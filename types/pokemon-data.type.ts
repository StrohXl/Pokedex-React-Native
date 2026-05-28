import { PokemonSpecies, PokemonSpeciesVariety } from "./pokemon-species.type";
import { Pokemon } from "./pokemon.type";

export type PokemonData = {
  default: Pokemon | undefined;
  prev: Pokemon | undefined;
  next: Pokemon | undefined;
  species: PokemonSpecies | undefined;
  varieties: PokemonSpeciesVariety[] | undefined;
};
