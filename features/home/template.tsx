import CardPokemon from "@/components/CardPokemon";
import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import { Pokemon } from "@/types/pokemon.type";
import { Image } from "expo-image";
import { FlatList } from "react-native";

export default function TemplateHome({
  pokemon,
  getMorePokemon,
  numColumns,
}: {
  getMorePokemon: () => void;
  pokemon: Pokemon[];
  numColumns: number;
}) {
  const columnGap = 15;

  return (
    <ContainerInitial
      style={{
        flex: 1,
        height: "100%",
        paddingInline: 0,
      }}
    >
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
        data={pokemon}
        keyExtractor={(item) => item.name}
        numColumns={numColumns}
        onEndReachedThreshold={0.8}
        style={{
          paddingInline: 15,
        }}
        ListHeaderComponent={() => (
          <ThemedText
            type="title"
            style={{ paddingTop: 15, paddingBottom: 30 }}
          >
            Pokedex
          </ThemedText>
        )}
        onEndReached={getMorePokemon}
        columnWrapperStyle={{
          gap: columnGap,
          marginBottom: 15,
        }}
        renderItem={({ item }) => (
          <CardPokemon pokemon={item} id={`${item.id}`} />
        )}
      />
    </ContainerInitial>
  );
}
