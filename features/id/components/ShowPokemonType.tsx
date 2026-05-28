import { POKEMON_TYPE_COLORS } from "@/constants/types";
import { Pokemon } from "@/types/pokemon.type";
import { View } from "react-native";
import { ThemedText } from "../../../components/themed-text";

export default function ShowPokemonType({
  loading,
  pokemon,
}: {
  loading: boolean;
  pokemon: Pokemon | undefined;
}) {
  return (
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
  );
}
