import { PokemonData } from "@/types/pokemon-data.type";

export type StatesType = {
  id: string;
  number: string;
  urlImage: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pokemonData: PokemonData;
  setPokemonData: React.Dispatch<React.SetStateAction<PokemonData>>;
  nameDefault: string;
  setNameDefault: React.Dispatch<React.SetStateAction<string>>;
  description: string;
};
