import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F1E8" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333" }}>✓ Urban Sim AI Mobile</Text>
      <Text style={{ fontSize: 16, color: "#666", marginTop: 10 }}>Ready to build amazing things!</Text>
    </View>
  );
}
