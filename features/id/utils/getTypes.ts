import { Pokemon, PokemonTypeSlot } from "@/types/pokemon.type";

export default function getTypes({
  pokemon,
}: {
  pokemon: Pokemon | undefined;
}): PokemonTypeSlot[] {
  const types = pokemon
    ? pokemon.types
    : [
        {
          type: {
            name: "normal",
            url: "",
          },
          slot: 0,
        },
      ];
  return types;
}
