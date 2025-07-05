import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ResumoFinanceiro({ gastos, totalDespesas, totalReceitas, saldoFinal }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo Financeiro</Text>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trending-up-outline" size={24} color="#4CAF50" />
            <Text style={styles.cardTitle}>Receitas</Text>
          </View>
          <Text style={[styles.valorTotal, { color: "#4CAF50" }]}>R$ {totalReceitas.toFixed(2).replace(".", ",")}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="trending-down-outline" size={24} color="#F44336" />
            <Text style={styles.cardTitle}>Despesas</Text>
          </View>
          <Text style={[styles.valorTotal, { color: "#F44336" }]}>R$ {totalDespesas.toFixed(2).replace(".", ",")}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="wallet-outline" size={24} color={saldoFinal >= 0 ? "#4CAF50" : "#F44336"} />
            <Text style={styles.cardTitle}>Saldo Final</Text>
          </View>
          <Text style={[styles.valorTotal, { color: saldoFinal >= 0 ? "#4CAF50" : "#F44336" }]}>
            R$ {saldoFinal.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="list-outline" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>Total de Transações</Text>
          </View>
          <Text style={[styles.valorTotal, { color: "#2196F3" }]}>{gastos.length}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: "48%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#666",
  },
  valorTotal: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
