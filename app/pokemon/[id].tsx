import ContainerInitial from "@/components/ContainerInitial";
import ContainerInfo from "@/components/id/Containerinfo";
import FooterNavegation from "@/components/id/FooterNavegation";
import { ThemedText } from "@/components/themed-text";
import LinearGradientPokemon from "@/components/ui/LinearGradient";
import { POKEMON_TYPE_COLORS } from "@/constants/types";
import { getData } from "@/services/getData";
import { baseUrlImage, baseUrlSound } from "@/services/urlApi";
import {
  PokemonSpecies,
  PokemonSpeciesVariety,
} from "@/types/pokemon-species.type";
import { Pokemon } from "@/types/pokemon.type";
import axios from "axios";
import { useAudioPlayer } from "expo-audio";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function PokemonDetail() {
  const [id, setId] = useState(useLocalSearchParams().id);
  const [loading, setLoading] = useState(true);
  const [dataPokemon, setDataPokemon] = useState<{
    default: Pokemon | undefined;
    prev: Pokemon | undefined;
    next: Pokemon | undefined;
    species: PokemonSpecies | undefined;
    varieties: PokemonSpeciesVariety[] | undefined;
  }>({
    default: undefined,
    prev: undefined,
    next: undefined,
    species: undefined,
    varieties: [],
  });
  const [nameDefault, setNameDefault] = useState("");
  const pokemon = dataPokemon.default;
  const description =
    dataPokemon.species?.flavor_text_entries.filter(
      (item) => item.language.name === "es",
    ) ?? "";

  const number = `${id}`.padStart(3, "0");
  const urlImage = `${baseUrlImage + `${dataPokemon.default?.id}`.padStart(3, "0")}.webp`;

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

      const species = speciesRes.data as PokemonSpecies;
      const varieties = species.varieties;

      const fetchs = {
        default: defaultRes.data as Pokemon,
        prev: prevRes ? (prevRes.data as Pokemon) : undefined,
        next: nextRes.data as Pokemon,
        species: speciesRes?.data as PokemonSpecies,
        varieties,
      };
      setNameDefault(defaultRes.data.name);
      setDataPokemon(fetchs);
      loadSound(idPokemon);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonVariant = async (urlPokemon: string) => {
    try {
      const pokemonVariant: Pokemon = (await axios.get(urlPokemon)).data;
      setDataPokemon((prev) => ({ ...prev, default: pokemonVariant }));
    } catch (error) {
      console.log(error);
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
              position: "relative",
              marginTop: 50,
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
              }}
              contentFit="contain"
            />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{
                marginBottom: 20,
              }}
            >
              {dataPokemon.varieties?.map((item, index) => {
                const removeName =
                  index > 0
                    ? item.pokemon.name.replace(nameDefault ?? "", "")
                    : item.pokemon.name;
                return (
                  <Pressable
                    key={item.pokemon.name}
                    onPress={() => getPokemonVariant(item.pokemon.url)}
                  >
                    <View
                      style={{
                        backgroundColor:
                          item.pokemon.name === dataPokemon.default?.name
                            ? "#fff"
                            : "#c0c0c0",
                        marginInline: 5,
                        paddingInline: 5,
                        paddingVertical: 1,
                        borderRadius: 4,
                        minWidth: 60,
                      }}
                    >
                      <ThemedText
                        style={{
                          textTransform: "capitalize",
                          textAlign: "center",
                          fontSize: 10,
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {removeName.replace("-", " ")}
                      </ThemedText>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Image
              source={{
                uri: urlImage,
              }}
              style={{
                width: 200,
                height: 200,
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
                    fontSize: 14,
                    textTransform: "capitalize",
                    paddingInline: 10,
                    paddingVertical: 3,
                    textAlign: "center",
                    fontWeight: 500,
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
                  opacity: loading ? 0 : 1,
                }}
                type="defaultSemiBold"
              >
                {pokemon && pokemon.weight} KG
              </ThemedText>
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: 12,
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
                  opacity: loading ? 0 : 1,
                }}
                type="defaultSemiBold"
              >
                {pokemon && pokemon.height} M
              </ThemedText>
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: 12,
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
