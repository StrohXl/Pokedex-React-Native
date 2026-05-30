import getPokemon from "@/features/home/services/getPokemon";
import TemplateHome from "@/features/home/template";
import { Pokemon } from "@/types/pokemon.type";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import "react-native-reanimated";

const limit = 20;

export default function RootLayout() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [morePage, setMorePage] = useState(true);

  const states = {
    pokemon,
    setPokemon,
    offset,
    setOffset,
    loading,
    setLoading,
    morePage,
    setMorePage,
  };

  const getMorePokemon = () => {
    if (!loading && morePage) getPokemon({ limit, pageOffset: offset, states });
  };

  const { width } = useWindowDimensions();
  const breakpoints = (): number => {
    if (width >= 768) {
      return 5;
    }
    return 2;
  };
  const numColumns = breakpoints();

  return (
    <TemplateHome
      numColumns={numColumns}
      getMorePokemon={getMorePokemon}
      pokemon={pokemon}
    />
  );
}
