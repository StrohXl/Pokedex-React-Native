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
          <ThemedText style={{ color: "#fff" }} type="defaultSemiBold">
            Pokédex №
          </ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText style={{ color: "#fff" }}>{id}</ThemedText>
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
          <ThemedText style={{ color: "#fff" }} type="defaultSemiBold">
            Introduced
          </ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              textTransform: "capitalize",
              color: "#fff",
            }}
          >
            {pokemonData.species?.generation.name.split("-")[0]}
            <Text
              style={{
                textTransform: "uppercase",
                color: "#fff",
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
          <ThemedText style={{ color: "#fff" }} type="defaultSemiBold">
            Category
          </ThemedText>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <ThemedText
            style={{
              textTransform: "capitalize",
              color: "#fff",
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
          <ThemedText style={{ color: "#fff" }} type="defaultSemiBold">
            Abilities
          </ThemedText>
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
                color: "#fff",
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
