import ContainerInitial from "@/components/ContainerInitial";
import { ThemedText } from "@/components/themed-text";
import LinearGradientPokemon from "@/components/ui/LinearGradient";
import { AudioPlayer } from "expo-audio";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import FooterNavegation from "../id/components/FooterNavegation";
import ShowPokemonType from "../id/components/ShowPokemonType";
import ShowVarieties from "../id/components/ShowVarieties";
import TableInfo from "../id/components/TableInfo";
import getPokemon from "../id/services/getPokemon";
import getPokemonVarieties from "../id/services/getPokemonVarieties";
import { StatesType } from "../id/types/states.type";

export default function TemplateId({
  states,
  player,
}: {
  states: StatesType;
  player: AudioPlayer;
}) {
  const {
    description,
    loading,
    id,
    nameDefault,
    number,
    pokemonData,
    urlImage,
  } = states;
  const { height } = useWindowDimensions();
  return (
    <ContainerInitial
      style={{
        paddingInline: 0,
        height: "100%",
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <LinearGradientPokemon
          style={{
            borderRadius: 0,
            paddingInline: 15,
            minHeight: height,
          }}
          colorOpacity="50"
          pokemon={pokemonData.default}
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
              getPokemonVariant={(value) =>
                getPokemonVarieties({ states, urlPokemon: value })
              }
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
              maxWidth: 600,
              width: "100%",
              marginInline: "auto",
              display: loading ? "none" : "flex",
            }}
          >
            <FooterNavegation
              style={{
                marginTop: 20,
              }}
              id={`${id}`}
              updatePokemon={(value) => {
                getPokemon({
                  idPokemon: value,
                  states,
                  player,
                });
              }}
              prev={pokemonData.prev}
              next={pokemonData.next}
            />
            <ThemedText style={{ marginTop: 20 }}>{description}</ThemedText>
            <TableInfo id={Number(id)} pokemonData={pokemonData} />
          </View>
        </LinearGradientPokemon>
      </ScrollView>
    </ContainerInitial>
  );
}
