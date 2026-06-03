import { POKEMON_TYPE_COLORS } from "@/constants/types";
import getTypes from "@/features/id/utils/getTypes";
import { Pokemon } from "@/types/pokemon.type";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

const aplicarOpacidadSobreNegro = ({
  color,
  opacity,
}: {
  color: string;
  opacity: number;
}) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const r_final = Math.round(r * opacity);
  const g_final = Math.round(g * opacity);
  const b_final = Math.round(b * opacity);
  const toHex = (c: number) => c.toString(16).padStart(2, "0");
  return `#${toHex(r_final)}${toHex(g_final)}${toHex(b_final)}`;
};

export default function LinearGradientPokemon({
  pokemon,
  children,
  style,
  opacity = 1,
}: {
  children?: ReactNode;
  pokemon: Pokemon | undefined;
  style?: StyleProp<ViewStyle>;
  opacity?: number;
}) {
  const types = getTypes({ pokemon });

  const typesLength = types.length;
  const color1 = aplicarOpacidadSobreNegro({
    color: POKEMON_TYPE_COLORS[types[0].type.name],
    opacity,
  });
  const color2 =
    typesLength > 1
      ? aplicarOpacidadSobreNegro({
          color: POKEMON_TYPE_COLORS[types[1].type.name],
          opacity,
        })
      : aplicarOpacidadSobreNegro({
          color: POKEMON_TYPE_COLORS[types[0].type.name],
          opacity,
        });
  return (
    <LinearGradient
      colors={[color1, color2]}
      style={[
        {
          position: "relative",
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
