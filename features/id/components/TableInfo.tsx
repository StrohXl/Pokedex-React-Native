import { PokemonData } from "@/types/pokemon-data.type";
import { Text, View } from "react-native";
import { ThemedText } from "../../../components/themed-text";

export default function TableInfo({
  id,
  pokemonData,
}: {
  pokemonData: PokemonData;
  id: number;
}) {
  return (
    <View style={{ marginTop: 20, gap: 10, paddingBottom: 20 }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#fff",
          paddingBottom: 5,
          borderBottomWidth: 1,
          gap: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText type="defaultSemiBold">Pokédex №</ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText>{id}</ThemedText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#fff",
          paddingBottom: 5,
          borderBottomWidth: 1,
          gap: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText type="defaultSemiBold">Introduced</ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              textTransform: "capitalize",
            }}
          >
            {pokemonData.species?.generation.name.split("-")[0]}
            <Text
              style={{
                textTransform: "uppercase",
              }}
            >
              {` ${pokemonData.species?.generation.name.split("-")[1]}`}
            </Text>
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#fff",
          paddingBottom: 5,
          borderBottomWidth: 1,
          gap: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText type="defaultSemiBold">Category</ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              textTransform: "capitalize",
            }}
          >
            {
              pokemonData.species?.genera.find(
                (item) => item.language.name === "en",
              )?.genus
            }
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 15,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText type="defaultSemiBold">Abilities</ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          {pokemonData.default?.abilities.map((item, index) => (
            <ThemedText
              key={item.ability.name}
              style={{
                textTransform: "capitalize",
              }}
            >
              {index + 1}. {item.ability.name}
            </ThemedText>
          ))}
        </View>
      </View>
    </View>
  );
}
