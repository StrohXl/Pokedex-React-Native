import { baseUrlImage } from "@/services/urlApi";
import { Pokemon } from "@/types/pokemon.type";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { ThemedText } from "./themed-text";
import LinearGradientPokemon from "./ui/LinearGradient";

export default function CardPokemon({
  pokemon,
  id,
  cardWidth,
}: {
  pokemon: Pokemon;
  id: string;
  cardWidth: number;
}) {
  const number = id.padStart(3, "0");
  const urlImage = `${baseUrlImage + number}.webp`;
  const imageWidth = cardWidth / 1.5;
  return (
    <View
      style={{
        width: cardWidth,
      }}
    >
      <Link
        href={{
          pathname: `/pokemon/[id]`,
          params: {
            id: pokemon.id,
          },
        }}
        asChild
      >
        <Pressable>
          <LinearGradientPokemon types={pokemon.types}>
            <Image
              style={{
                width: "80%",
                height: "auto",
                position: "absolute",
                aspectRatio: 1,
                right: 0,
                opacity: 0.2,
              }}
              contentFit="contain"
              source={require("@/assets/images/pokemon/pngwing.com.png")}
            />
            <Image
              style={{
                width: imageWidth,
                aspectRatio: 1,
                objectFit: "contain",
                marginInline: "auto",
                marginBottom: 15,
              }}
              source={urlImage}
            />
            <ThemedText
              type="subtitle"
              style={{
                textAlign: "center",
                marginTop: "auto",
                color: "#000",

                textTransform: "capitalize",
              }}
            >
              #{number}
            </ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{
                color: "#222",
                textTransform: "capitalize",
                alignSelf: "flex-start",
                backgroundColor: "#fff",
                borderRadius: 5,
                paddingInline: 10,
                paddingTop: 2,
                marginInline: "auto",
                marginTop: 15,
                paddingBottom: 2,
              }}
            >
              {pokemon.name}
            </ThemedText>
          </LinearGradientPokemon>
        </Pressable>
      </Link>
    </View>
  );
}
