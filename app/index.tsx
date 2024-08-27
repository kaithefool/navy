import { View } from "react-native";
import { Button } from "tamagui";

export default function Home() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Button color="green">Home</Button>
    </View>
  );
}