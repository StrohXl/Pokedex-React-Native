import "react-native-reanimated";

import CardPokemon from "@/components/CardPokemon";
import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import { getData } from "@/services/getData";
import { Pokemon } from "@/types/pokemon.type";
import { GetPokemons } from "@/types/pokemons.type";
import axios, { AxiosResponse } from "axios";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { width } = useWindowDimensions();
  const paddingHorizontal = 15;
  const columnGap = 15;
  const cardWidth = (width - paddingHorizontal * 2 - columnGap) / 2;

  const getPokemon = async () => {
    const data = await getData<GetPokemons>({
      endPoint: "pokemon",
      limit: 20,
    });
    const dataPokemons = data.data.results;
    const fetchPokemons = dataPokemons.map((pokemon) => axios.get(pokemon.url));
    const listaCompletaConDatos: AxiosResponse<Pokemon>[] =
      await Promise.all(fetchPokemons);
    const pokemonsDetails = listaCompletaConDatos.map((item) => item.data);
    setPokemons(pokemonsDetails);
  };

  useEffect(() => {
    getPokemon();
  }, []);

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
        columnWrapperStyle={{
          gap: columnGap,
          marginBottom: 15,
        }}
        renderItem={({ item, index }) => (
          <CardPokemon
            cardWidth={cardWidth}
            pokemon={item}
            id={`${index + 1}`}
          />
        )}
      />
    </ContainerInitial>
  );
}
