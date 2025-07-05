import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"

export default function GastoCard({ gasto, index, excluirGasto }) {
  const { descricao, valor, categoria, data, tipo } = gasto

  const confirmarExclusao = () => {
    Alert.alert("Confirmar Exclusão", `Deseja realmente excluir "${descricao}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => excluirGasto(index) },
    ])
  }

  const getCorCategoria = (categoria) => {
    const cores = {
      alimentacao: "#FF6B6B",
      transporte: "#4ECDC4",
      lazer: "#45B7D1",
      saude: "#96CEB4",
      educacao: "#FFEAA7",
      trabalho: "#DDA0DD",
      outros: "#999",
    }
    return cores[categoria] || "#999"
  }

  const getNomeCategoria = (categoria) => {
    const nomes = {
      alimentacao: "Alimentação",
      transporte: "Transporte",
      lazer: "Lazer",
      saude: "Saúde",
      educacao: "Educação",
      trabalho: "Trabalho",
      outros: "Outros",
    }
    return nomes[categoria] || "Outros"
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.tipoIndicador}>
          <Ionicons
            name={tipo === "receita" ? "arrow-up-circle" : "arrow-down-circle"}
            size={16}
            color={tipo === "receita" ? "#4CAF50" : "#F44336"}
          />
          <Text style={[styles.tipoTexto, { color: tipo === "receita" ? "#4CAF50" : "#F44336" }]}>
            {tipo === "receita" ? "Receita" : "Despesa"}
          </Text>
        </View>
        <TouchableOpacity onPress={confirmarExclusao} style={styles.botaoExcluir}>
          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <Text style={styles.descricao}>{descricao}</Text>

      <View style={styles.cardBody}>
        <View style={[styles.categoria, { backgroundColor: getCorCategoria(categoria) }]}>
          <Text style={styles.textoCategoria}>{getNomeCategoria(categoria)}</Text>
        </View>
        <Text style={styles.data}>{data}</Text>
      </View>

      <Text style={[styles.valor, { color: tipo === "receita" ? "#4CAF50" : "#F44336" }]}>
        {tipo === "receita" ? "+" : "-"} R$ {valor.toFixed(2).replace(".", ",")}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tipoIndicador: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipoTexto: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  descricao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  botaoExcluir: {
    padding: 5,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoria: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  textoCategoria: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  data: {
    fontSize: 14,
    color: "#666",
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
})
