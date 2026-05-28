import { StyleProp, View, ViewStyle } from "react-native";

export default function ContainerInfo({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        style,
        {
          padding: 10,
          borderRadius: 8,
          backgroundColor: "#99999956",
        },
      ]}
    >
      {children}
    </View>
  );
}
