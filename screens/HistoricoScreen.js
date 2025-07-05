import { View, Text, FlatList, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import GastoCard from "../components/GastoCard"

export default function HistoricoScreen({ gastos, excluirGasto }) {
  const renderItem = ({ item, index }) => <GastoCard gasto={item} index={index} excluirGasto={excluirGasto} />

  const totalDespesas = gastos
    .filter((gasto) => gasto.tipo === "despesa")
    .reduce((total, gasto) => total + gasto.valor, 0)

  const totalReceitas = gastos
    .filter((gasto) => gasto.tipo === "receita")
    .reduce((total, gasto) => total + gasto.valor, 0)

  const saldoFinal = totalReceitas - totalDespesas

  return (
    <View style={{ flex: 1 }}>
      <Header title="Histórico de Transações" />
      <View style={styles.container}>
        {/* Resumo rápido */}
        <View style={styles.resumoContainer}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Receitas:</Text>
            <Text style={[styles.resumoValor, { color: "#4CAF50" }]}>
              R$ {totalReceitas.toFixed(2).replace(".", ",")}
            </Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Despesas:</Text>
            <Text style={[styles.resumoValor, { color: "#F44336" }]}>
              R$ {totalDespesas.toFixed(2).replace(".", ",")}
            </Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Saldo:</Text>
            <Text style={[styles.resumoValor, { color: saldoFinal >= 0 ? "#4CAF50" : "#F44336" }]}>
              R$ {saldoFinal.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>

        {gastos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma transação adicionada ainda</Text>
            <Text style={styles.emptySubtext}>Adicione sua primeira transação na aba "Nova Transação"</Text>
          </View>
        ) : (
          <FlatList
            data={gastos}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.lista}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  resumoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  resumoItem: {
    alignItems: "center",
  },
  resumoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  resumoValor: {
    fontSize: 14,
    fontWeight: "bold",
  },
  lista: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 8,
    textAlign: "center",
  },
})
