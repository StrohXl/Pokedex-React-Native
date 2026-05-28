import CardPokemon from "@/components/CardPokemon";
import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import { Pokemon } from "@/types/pokemon.type";
import { Image } from "expo-image";
import { FlatList } from "react-native";

export default function TemplateHome({
  pokemon,
  getMorePokemon,
  cardWidth,
  columnGap,
}: {
  getMorePokemon: () => void;
  pokemon: Pokemon[];
  columnGap: number;
  cardWidth: number;
}) {
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
        data={pokemon}
        keyExtractor={(item) => item.name}
        numColumns={2}
        onEndReachedThreshold={0.8}
        ListHeaderComponent={() => (
          <ThemedText
            type="title"
            style={{ paddingTop: 15, paddingBottom: 30 }}
          >
            Pokémon
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
