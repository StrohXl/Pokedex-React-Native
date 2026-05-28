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

  const { width } = useWindowDimensions();
  const paddingHorizontal = 15;
  const columnGap = 15;
  const cardWidth = (width - paddingHorizontal * 2 - columnGap) / 2;

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

  return (
    <TemplateHome
      cardWidth={cardWidth}
      columnGap={columnGap}
      getMorePokemon={getMorePokemon}
      pokemon={pokemon}
    />
  );
}
