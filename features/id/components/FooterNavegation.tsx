import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { baseUrlImage } from "@/services/urlApi";
import { Pokemon } from "@/types/pokemon.type";
import { Image } from "expo-image";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import ContainerInfo from "./Containerinfo";

export default function FooterNavegation({
  id,
  next,
  prev,
  style,
  updatePokemon,
}: {
  id: string;
  prev: Pokemon | undefined;
  next: Pokemon | undefined;
  style?: StyleProp<ViewStyle>;
  updatePokemon: (value: string) => void;
}) {
  const navegation = [];

  if (prev) {
    const number = `${Number(id) - 1}`.padStart(3, "0");
    navegation.push({
      direction: "prev",
      name: prev.name,
      imageUrl: `${baseUrlImage + number}.webp`,
      idNumber: number,
      id: `${Number(id) - 1}`,
    });
  }
  if (next) {
    const number = `${Number(id) + 1}`.padStart(3, "0");

    navegation.push({
      direction: "next",
      name: next.name,
      imageUrl: `${baseUrlImage + number}.webp`,
      idNumber: number,
      id: `${Number(id) + 1}`,
    });
  }

  return (
    <View
      style={[
        style,
        {
          maxWidth: 400,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginInline: "auto",
          gap: "4%",
        },
      ]}
      className="container-navegation"
    >
      {navegation.map((nav) => (
        <Pressable
          style={{
            width: "48%",
            marginLeft: "auto",
          }}
          onPress={() => updatePokemon(nav.id)}
          key={nav.direction}
        >
          <ContainerInfo
            key={nav.name}
            style={{
              flexDirection: nav.direction === "prev" ? "row" : "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <IconSymbol
              name={nav.direction === "prev" ? "chevron-left" : "chevron-right"}
              color="#fff"
              size={25}
              style={{
                marginInline: -6,
              }}
            />
            <Image
              source={nav.imageUrl}
              style={{
                width: 30,
                height: "auto",
                aspectRatio: 1,
              }}
              contentFit="contain"
            />
            <View
              style={{
                flex: 1,
              }}
            >
              <ThemedText
                type="defaultSemiBold"
                style={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  lineHeight: 18,
                  color: "#eee",
                }}
              >
                #{nav.idNumber}
              </ThemedText>
              <ThemedText
                type="defaultSemiBold"
                numberOfLines={1}
                style={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  lineHeight: 18,
                  color: "#fff",
                }}
              >
                {nav.name}
              </ThemedText>
            </View>
          </ContainerInfo>
        </Pressable>
      ))}
    </View>
  );
}
