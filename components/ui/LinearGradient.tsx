import { POKEMON_TYPE_COLORS } from "@/constants/types";
import { PokemonTypeSlot } from "@/types/pokemon.type";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export default function LinearGradientPokemon({
  types,
  children,
  style,
  colorOpacity = "ff",
}: {
  children: ReactNode;
  types: PokemonTypeSlot[];
  style?: StyleProp<ViewStyle>;
  colorOpacity?: string;
}) {
  const typesLength = types.length;
  const color1 = POKEMON_TYPE_COLORS[types[0].type.name] + colorOpacity;
  const color2 =
    typesLength > 1
      ? POKEMON_TYPE_COLORS[types[1].type.name] + colorOpacity
      : POKEMON_TYPE_COLORS[types[0].type.name] + colorOpacity;
  return (
    <LinearGradient
      colors={[color1, color2]}
      style={[
        {
          position: "relative",
          padding: 15,
          borderRadius: 10,
        },
        style,
      ]}
      locations={[0.4, 0.6]}
    >
      {children}
    </LinearGradient>
  );
}
