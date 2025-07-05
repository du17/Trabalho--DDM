"use client"

import { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Input from "../components/Input"
import Header from "../components/Header"
import Button from "../components/Button"

export default function NovoGastoScreen({ navigation, adicionarGasto }) {
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("alimentacao")
  const [tipo, setTipo] = useState("despesa")

  const categorias = [
    { label: "Alimentação", value: "alimentacao" },
    { label: "Transporte", value: "transporte" },
    { label: "Lazer", value: "lazer" },
    { label: "Saúde", value: "saude" },
    { label: "Educação", value: "educacao" },
    { label: "Trabalho", value: "trabalho" },
    { label: "Outros", value: "outros" },
  ]

  const handleAdicionarGasto = () => {
    if (!descricao.trim() || !valor.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!")
      return
    }

    const valorNumerico = Number.parseFloat(valor.replace(",", "."))
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido!")
      return
    }

    const novoGasto = {
      id: Date.now(),
      descricao: descricao.trim(),
      valor: valorNumerico,
      categoria: categoria,
      tipo: tipo,
      data: new Date().toLocaleDateString("pt-BR"),
    }

    adicionarGasto(novoGasto)

    setDescricao("")
    setValor("")
    setCategoria("alimentacao")
    setTipo("despesa")

    Alert.alert("Sucesso", `${tipo === "despesa" ? "Despesa" : "Receita"} adicionada com sucesso!`)
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Nova Transação" />
      <View style={styles.container}>
        <Input label="Descrição:" value={descricao} onChangeText={setDescricao} placeholder="Descrição da transação" />

        <Input
          label="Valor (R$):"
          value={valor}
          onChangeText={setValor}
          placeholder="Ex: 25,50"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Categoria:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
            {categorias.map((cat) => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Tipo:</Text>
        <View style={styles.tipoContainer}>
          <TouchableOpacity
            onPress={() => setTipo("despesa")}
            style={[styles.tipoButton, tipo === "despesa" && styles.tipoButtonSelecionado]}
          >
            <Text style={[styles.tipoButtonText, tipo === "despesa" && styles.tipoButtonSelecionadoText]}>Despesa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTipo("receita")}
            style={[styles.tipoButton, tipo === "receita" && styles.tipoButtonSelecionado]}
          >
            <Text style={[styles.tipoButtonText, tipo === "receita" && styles.tipoButtonSelecionadoText]}>Receita</Text>
          </TouchableOpacity>
        </View>

        <Button title="Adicionar Transação" onPress={handleAdicionarGasto} style={styles.adicionarButton} />
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tipoButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  tipoButtonText: {
    fontSize: 16,
    color: "#666",
  },
  tipoButtonSelecionado: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  tipoButtonSelecionadoText: {
    color: "#fff",
    fontWeight: "bold",
  },
  adicionarButton: {
    marginTop: 20,
  },
})
