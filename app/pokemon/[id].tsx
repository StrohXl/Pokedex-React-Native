import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import LinearGradientPokemon from "@/components/ui/LinearGradient";
import { getData } from "@/services/getData";
import { Pokemon } from "@/types/pokemon.type";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const baseUrlImage = "https://assets.pokestats.gg/pokemon/compressed/";
const baseUrlSprite = "https://play.pokemonshowdown.com/sprites/xyani/";

export default function PokemonDetail() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const number = `${id}`.padStart(3, "0");
  const urlImage = `${baseUrlImage + number}.webp`;
  const urlSprite = `${baseUrlSprite}${pokemon?.name}.gif`;
  const getPokemon = async () => {
    const { data } = await getData<Pokemon>({ endPoint: `pokemon/${id}` });
    setPokemon(data);
  };
  const types = pokemon ? pokemon.types : [];

  useEffect(() => {
    getPokemon();
  }, []);

  if (pokemon)
    return (
      <LinearGradientPokemon
        style={{
          flex: 1,
        }}
        types={types}
      >
        <ContainerInitial>
          <ScrollView>
            <View
              style={{
                justifyContent: "flex-start",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/assets/images/pokemon/pngwing.com.png")}
                style={{
                  width: 250,
                  aspectRatio: 1,
                  position: "absolute",
                  opacity: 0.2,
                  tintColor: "#fff",
                  top: 50,
                }}
                contentFit="contain"
              />
              <Image
                source={{
                  uri: urlImage,
                }}
                style={{
                  width: 200,
                  height: 200,

                  marginTop: 50,
                }}
                contentFit="contain"
              />
            </View>
            <ThemedText
              style={{
                textAlign: "center",
                marginTop: 15,
                textTransform: "capitalize",
              }}
              type="subtitle"
            >
              {pokemon.name}
            </ThemedText>
            <View
              style={{
                display: "flex",
                marginTop: 30,
                gap: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff3a",
                  padding: 10,
                  width: 130,
                  borderRadius: 8,
                }}
              >
                <ThemedText
                  style={{ textAlign: "center", fontSize: 18 }}
                  type="defaultSemiBold"
                >
                  {pokemon.weight} KG
                </ThemedText>
                <ThemedText
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                  type="defaultSemiBold"
                >
                  WEIGHT
                </ThemedText>
              </View>

              <View
                style={{
                  backgroundColor: "#ffffff3a",
                  padding: 10,
                  width: 130,
                  borderRadius: 8,
                }}
              >
                <ThemedText
                  style={{ textAlign: "center", fontSize: 18 }}
                  type="defaultSemiBold"
                >
                  {pokemon.height} M
                </ThemedText>
                <ThemedText
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    textTransform: "uppercase",
                  }}
                  type="defaultSemiBold"
                >
                  height
                </ThemedText>
              </View>
            </View>
          </ScrollView>
        </ContainerInitial>
      </LinearGradientPokemon>
    );
  else {
    return <View></View>;
  }
}
