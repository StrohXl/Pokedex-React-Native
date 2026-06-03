import { ThemedText } from "@/components/themed-text";
import { PokemonSpeciesVariety } from "@/types/pokemon-species.type";
import { Pokemon } from "@/types/pokemon.type";
import { Pressable, ScrollView, View } from "react-native";

export default function ShowVarieties({
  varieties,
  pokemon,
  getPokemonVariant,
  nameDefault,
  loading,
}: {
  loading: boolean;
  nameDefault: string;
  varieties: PokemonSpeciesVariety[] | undefined;
  pokemon: Pokemon | undefined;
  getPokemonVariant: (value: string) => void;
}) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        marginBottom: 20,
        minHeight: 26,
      }}
    >
      {!loading &&
        varieties &&
        varieties.length > 1 &&
        varieties.map((item, index) => {
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
                    item.pokemon.name === pokemon?.name ? "#fff" : "#c0c0c0",
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
  );
}
