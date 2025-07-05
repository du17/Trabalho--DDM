import { View, StyleSheet } from "react-native"
import Header from "../components/Header"
import ResumoFinanceiro from "../components/ResumoFinanceiro"

export default function ResumoScreen({ gastos }) {

  const totalDespesas = gastos
    .filter((gasto) => gasto.tipo === "despesa")
    .reduce((total, gasto) => total + Number.parseFloat(gasto.valor), 0)

  const totalReceitas = gastos
    .filter((gasto) => gasto.tipo === "receita")
    .reduce((total, gasto) => total + Number.parseFloat(gasto.valor), 0)

  const saldoFinal = totalReceitas - totalDespesas

  return (
    <View style={{ flex: 1 }}>
      <Header title="Resumo Financeiro" />
      <View style={styles.container}>
        <ResumoFinanceiro
          gastos={gastos}
          totalDespesas={totalDespesas}
          totalReceitas={totalReceitas}
          saldoFinal={saldoFinal}
        />
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
})
