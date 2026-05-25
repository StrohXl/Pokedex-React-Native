import "react-native-reanimated";

import CardPokemon from "@/components/CardPokemon";
import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import { getData } from "@/services/getData";
import { Pokemon } from "@/types/pokemon.type";
import { GetPokemons } from "@/types/pokemons.type";
import axios, { AxiosResponse } from "axios";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";

const limit = 20;

export default function RootLayout() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { width } = useWindowDimensions();
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const paddingHorizontal = 15;
  const columnGap = 15;
  const cardWidth = (width - paddingHorizontal * 2 - columnGap) / 2;

  const getPokemon = async (pageOffset = 0) => {
    if (loading && !morePage) return;
    setLoading(true);

    try {
      const data = await getData<GetPokemons>({
        endPoint: "pokemon",
        offset: pageOffset,
        limit,
      });
      const dataPokemons = data.data.results;
      const fetchPokemons = dataPokemons.map((pokemon) =>
        axios.get(pokemon.url),
      );
      const listaCompletaConDatos: AxiosResponse<Pokemon>[] =
        await Promise.all(fetchPokemons);
      setMorePage(Boolean(data.data.next));
      setOffset((prev) => prev + limit);
      const pokemonsDetails = listaCompletaConDatos.map((item) => item.data);
      setPokemons((prev) => [...prev, ...pokemonsDetails]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getMorePokemon = () => {
    if (!loading && morePage) getPokemon(offset);
  };

  return (
    <ContainerInitial>
      <Image
        style={{
          width: 300,
          height: 300,
          position: "absolute",
          top: -30,
          right: -120,
        }}
        source={require("@/assets/images/pokemon/pngwing.com.png")}
      />

      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <ThemedText
            type="title"
            style={{ paddingTop: 15, paddingBottom: 30 }}
          >
            Pokemones
          </ThemedText>
        )}
        onEndReached={getMorePokemon}
        columnWrapperStyle={{
          gap: columnGap,
          marginBottom: 15,
        }}
        renderItem={({ item }) => (
          <CardPokemon cardWidth={cardWidth} pokemon={item} id={`${item.id}`} />
        )}
      />
    </ContainerInitial>
  );
}
