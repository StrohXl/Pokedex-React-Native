import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import LinearGradientPokemon from "@/components/ui/LinearGradient";
import FooterNavegation from "@/features/id/components/FooterNavegation";
import ShowPokemonType from "@/features/id/components/ShowPokemonType";
import ShowVarieties from "@/features/id/components/ShowVarieties";
import TableInfo from "@/features/id/components/TableInfo";
import loadSound from "@/features/id/utils/loadSound";
import { getData } from "@/services/getData";
import { baseUrlImage, baseUrlSound } from "@/services/urlApi";
import { PokemonData } from "@/types/pokemon-data.type";
import { PokemonSpecies } from "@/types/pokemon-species.type";
import { Pokemon } from "@/types/pokemon.type";
import { useAudioPlayer } from "expo-audio";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function PokemonDetail() {
  const [id, setId] = useState(useLocalSearchParams().id);
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonData>({
    default: undefined,
    prev: undefined,
    next: undefined,
    species: undefined,
    varieties: [],
  });
  const [nameDefault, setNameDefault] = useState("");
  const description =
    pokemonData.species?.flavor_text_entries.filter(
      (item) => item.language.name === "en",
    ) ?? "";

  const number = `${id}`.padStart(3, "0");
  const urlImage = `${baseUrlImage + `${pokemonData.default?.id}`.padStart(3, "0")}.webp`;

  const player = useAudioPlayer(
    `${baseUrlSound}${useLocalSearchParams().id}.ogg`,
  );

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
      setPokemonData(fetchs);
      loadSound({ player, id: idPokemon });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemonVariant = async (urlPokemon: string) => {
    const idVariant = new URL(urlPokemon).pathname
      .split("/")
      .filter(Boolean)
      .pop();
    setLoading(true);
    try {
      const promises = [
        getData({
          endPoint: `/pokemon/${idVariant}`,
        }),
      ];
      const [res1] = await Promise.all(promises);
      const pokemonVariant = res1.data as Pokemon;
      setPokemonData((prev) => ({
        ...prev,
        default: pokemonVariant,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon(`${id}`);
  }, []);

  return (
    <LinearGradientPokemon
      style={{
        flex: 1,
      }}
      colorOpacity="50"
      pokemon={pokemonData.default}
    >
      <ContainerInitial style={{ paddingInline: 0 }}>
        <ScrollView
          style={{
            paddingInline: 15,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              marginTop: 25,
            }}
          >
            <Image
              source={require("@/assets/images/pokemon/pngwing.com.png")}
              style={{
                width: 250,
                aspectRatio: 1,
                position: "absolute",
                tintColor: "#fff",
                opacity: loading ? 0 : 0.2,
                top: 26,
              }}
              contentFit="contain"
            />
            <ShowVarieties
              getPokemonVariant={(value) => getPokemonVariant(value)}
              nameDefault={nameDefault}
              pokemon={pokemonData.default}
              varieties={pokemonData.varieties}
            />
            <View
              style={{
                width: 200,
                height: 200,
                justifyContent: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator size={100} color="#ffffff75" />
              ) : (
                <Image
                  source={{
                    uri: urlImage,
                  }}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  contentFit="contain"
                />
              )}
            </View>
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
            {!loading && pokemonData.default && pokemonData.default.name}
          </ThemedText>
          <ShowPokemonType loading={loading} pokemon={pokemonData.default} />
          <View
            style={{
              display: loading ? "none" : "contents",
            }}
          >
            <FooterNavegation
              style={{
                marginTop: 20,
              }}
              id={`${id}`}
              updatePokemon={(value) => getPokemon(value)}
              prev={pokemonData.prev}
              next={pokemonData.next}
            />
            <ThemedText style={{ marginTop: 20 }}>
              {description &&
                description[description.length - 1].flavor_text.replace(
                  /\s+/g,
                  " ",
                )}
            </ThemedText>
            <TableInfo id={Number(id)} pokemonData={pokemonData} />
          </View>
        </ScrollView>
      </ContainerInitial>
    </LinearGradientPokemon>
  );
}
