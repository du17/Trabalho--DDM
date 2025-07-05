import { View, Text, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Meu Gestor de Gastos © 2024</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
})
