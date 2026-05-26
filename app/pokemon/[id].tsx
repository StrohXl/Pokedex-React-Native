import ContainerInitial from "@/components/ContainerInitial";
import ContainerInfo from "@/components/id/Containerinfo";
import FooterNavegation from "@/components/id/FooterNavegation";
import { ThemedText } from "@/components/themed-text";
import LinearGradientPokemon from "@/components/ui/LinearGradient";
import { POKEMON_TYPE_COLORS } from "@/constants/types";
import { getData } from "@/services/getData";
import { baseUrlImage, baseUrlSound } from "@/services/urlApi";
import { PokemonSpecies } from "@/types/pokemon-species.type";
import { Pokemon } from "@/types/pokemon.type";
import { useAudioPlayer } from "expo-audio";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function PokemonDetail() {
  const [id, setId] = useState(useLocalSearchParams().id);
  const [loading, setLoading] = useState(true);
  const [dataPokemon, setDataPokemon] = useState<{
    default: Pokemon | undefined;
    prev: Pokemon | undefined;
    next: Pokemon | undefined;
    species: PokemonSpecies | undefined;
  }>({
    default: undefined,
    prev: undefined,
    next: undefined,
    species: undefined,
  });
  const pokemon = dataPokemon.default;
  const description =
    dataPokemon.species?.flavor_text_entries.filter(
      (item) => item.language.name === "es",
    ) ?? "";

  const number = `${id}`.padStart(3, "0");
  const urlImage = `${baseUrlImage + number}.webp`;

  const player = useAudioPlayer(
    `${baseUrlSound}${useLocalSearchParams().id}.ogg`,
  );

  const loadSound = (value: string) => {
    player.replace(`${baseUrlSound}${value}.ogg`);
    player.seekTo(0);
    player.play();
  };

  const getPokemon = async (idPokemon: string) => {
    const currentId = Number(idPokemon);
    setId(idPokemon);
    setLoading(true);
    try {
      const promises = [
        getData<PokemonSpecies>({ endPoint: `/pokemon-species/${idPokemon}` }),
        getData<Pokemon>({ endPoint: `/pokemon/${idPokemon}` }),
        getData<Pokemon>({ endPoint: `/pokemon/${currentId + 1}` }),
      ];
      if (currentId > 1)
        promises.push(
          getData<Pokemon>({ endPoint: `/pokemon/${currentId - 1}` }),
        );
      const [speciesRes, defaultRes, nextRes, prevRes] =
        await Promise.all(promises);

      const fetchs = {
        default: defaultRes.data as Pokemon,
        prev: prevRes ? (prevRes.data as Pokemon) : undefined,
        next: nextRes.data as Pokemon,
        species: speciesRes?.data as PokemonSpecies,
      };

      setDataPokemon(fetchs);
      loadSound(idPokemon);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getPokemon(`${id}`);
  }, []);

  return (
    <LinearGradientPokemon
      style={{
        flex: 1,
      }}
      colorOpacity="50"
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
                opacity: loading ? 0 : 1,
              }}
              contentFit="contain"
            />
          </View>
          <ThemedText
            style={{
              textAlign: "center",
              marginTop: 15,
              textTransform: "capitalize",
              opacity: loading ? 0 : 1,
            }}
            type="subtitle"
          >
            #{number}
          </ThemedText>
          <ThemedText
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
            type="subtitle"
          >
            {!loading && pokemon && pokemon.name}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              minHeight: 35,
              alignItems: "center",
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            {pokemon?.types.map(({ type }) => (
              <View
                style={{
                  backgroundColor: POKEMON_TYPE_COLORS[type.name],
                  borderRadius: 8,
                  minWidth: 100,
                  opacity: loading ? 0 : 1,
                }}
                key={type.name}
              >
                <ThemedText
                  style={{
                    textTransform: "capitalize",
                    paddingInline: 10,
                    paddingVertical: 3,
                    textAlign: "center",
                  }}
                >
                  {type.name}
                </ThemedText>
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: 20,
              gap: 10,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ContainerInfo
              style={{
                width: 130,
              }}
            >
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  opacity: loading ? 0 : 1,
                }}
                type="defaultSemiBold"
              >
                {pokemon && pokemon.weight} KG
              </ThemedText>
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  textTransform: "uppercase",
                  opacity: loading ? 0 : 1,
                }}
              >
                WEIGHT
              </ThemedText>
            </ContainerInfo>

            <ContainerInfo
              style={{
                width: 130,
              }}
            >
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  opacity: loading ? 0 : 1,
                }}
                type="defaultSemiBold"
              >
                {pokemon && pokemon.height} M
              </ThemedText>
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  textTransform: "uppercase",
                  opacity: loading ? 0 : 1,
                }}
              >
                height
              </ThemedText>
            </ContainerInfo>
          </View>
          <View
            style={{
              display: loading ? "none" : "contents",
            }}
          >
            <View style={{ marginTop: 20 }}>
              <ThemedText>
                {description &&
                  description[description.length - 1].flavor_text.replace(
                    /\s+/g,
                    " ",
                  )}
              </ThemedText>
            </View>
            <FooterNavegation
              style={{
                marginTop: 20,
              }}
              id={`${id}`}
              updatePokemon={(value) => getPokemon(value)}
              prev={dataPokemon.prev}
              next={dataPokemon.next}
            />
          </View>
        </ScrollView>
      </ContainerInitial>
    </LinearGradientPokemon>
  );
}
