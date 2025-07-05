"use client"

import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Text } from "react-native";

import Input from "../components/Input";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

export default function PerfilScreen() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("https://www.gravatar.com/avatar/?d=identicon")
  const [loading, setLoading] = useState(false)
  const PERFIL_STORAGE_KEY = "@MeuGestorDeGastos:perfil"

  useEffect(() => {
    carregarPerfil()
  }, [])

  const carregarPerfil = async () => {
    try {
      setLoading(true)
      const savedPerfil = await AsyncStorage.getItem(PERFIL_STORAGE_KEY)
      if (savedPerfil !== null) {
        const { nome, email, avatarUrl } = JSON.parse(savedPerfil)
        setNome(nome || "")
        setEmail(email || "")
        setAvatarUrl(avatarUrl || "https://www.gravatar.com/avatar/?d=identicon")
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error)
      Alert.alert("Erro", "Não foi possível carregar os dados do perfil")
    } finally {
      setLoading(false)
    }
  }

  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSalvarPerfil = async () => {
    try {
      if (!nome.trim()) {
        Alert.alert("Erro", "O nome é obrigatório!")
        return
      }

      if (nome.trim().length < 2) {
        Alert.alert("Erro", "O nome deve ter pelo menos 2 caracteres!")
        return
      }

      if (email.trim() && !validarEmail(email.trim())) {
        Alert.alert("Erro", "Por favor, insira um email válido!")
        return
      }

      setLoading(true)
      const perfilData = {
        nome: nome.trim(),
        email: email.trim(),
        avatarUrl,
        dataAtualizacao: new Date().toISOString(),
      }

      await AsyncStorage.setItem(PERFIL_STORAGE_KEY, JSON.stringify(perfilData))
      Alert.alert("Sucesso", "Perfil salvo com sucesso!")
      console.log("Perfil salvo:", perfilData)
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
      Alert.alert("Erro", "Erro ao salvar perfil. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleAlterarAvatar = (novaImagemUri) => {
    setAvatarUrl(novaImagemUri)
  }

  const handleLimparPerfil = () => {
    Alert.alert("Limpar Perfil", "Deseja realmente limpar todos os dados do perfil?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(PERFIL_STORAGE_KEY)
            setNome("")
            setEmail("")
            setAvatarUrl("https://www.gravatar.com/avatar/?d=identicon")
            Alert.alert("Sucesso", "Dados do perfil foram limpos!")
          } catch (error) {
            Alert.alert("Erro", "Não foi possível limpar os dados do perfil.")
          }
        },
      },
    ])
  }

  const handleLimparTodosDados = () => {
    Alert.alert(
      "⚠️ ATENÇÃO",
      "Esta ação irá apagar TODOS os dados do aplicativo:\n\n• Perfil do usuário\n• Todas as transações\n• Configurações\n\nEsta ação NÃO pode ser desfeita!",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "APAGAR TUDO",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true)
              await AsyncStorage.multiRemove(["@meuGestorDeGastos:gastos", "@MeuGestorDeGastos:perfil"])

              setNome("")
              setEmail("")
              setAvatarUrl("https://www.gravatar.com/avatar/?d=identicon")

              Alert.alert("Concluído", "Todos os dados foram apagados com sucesso!")
            } catch (error) {
              Alert.alert("Erro", "Não foi possível apagar todos os dados.")
            } finally {
              setLoading(false)
            }
          },
        },
      ],
    )
  }

  const handleExportarDados = async () => {
    try {
      const perfil = await AsyncStorage.getItem(PERFIL_STORAGE_KEY)
      const gastos = await AsyncStorage.getItem("@meuGestorDeGastos:gastos")

      const dadosExportacao = {
        perfil: perfil ? JSON.parse(perfil) : null,
        gastos: gastos ? JSON.parse(gastos) : [],
        dataExportacao: new Date().toISOString(),
        versaoApp: "1.0.0",
      }

      
      console.log("Dados para exportação:", JSON.stringify(dadosExportacao, null, 2))

      Alert.alert(
        "Exportação",
        `Dados exportados com sucesso!\n\nPerfil: ${dadosExportacao.perfil ? "Sim" : "Não"}\nTransações: ${dadosExportacao.gastos.length}\n\nVerifique o console para ver os dados.`,
      )
    } catch (error) {
      Alert.alert("Erro", "Não foi possível exportar os dados.")
    }
  }

  const mostrarInfo = () => {
    Alert.alert(
      "Sobre o App",
      "💰 Gestor de Gastos v1.0\n\n📱 Um app simples e eficiente para controlar suas finanças pessoais.\n\n🚀 Desenvolvido com React Native e Expo.\n\n✨ Funcionalidades:\n• Controle de receitas e despesas\n• Categorização de transações\n• Relatórios financeiros\n• Perfil personalizado\n• Dados salvos localmente",
      [{ text: "OK" }],
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Meu Perfil" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Seção do Avatar */}
        <View style={styles.avatarSection}>
          <Avatar url={avatarUrl} size={120} onImageChange={handleAlterarAvatar} editable={true} />
          <Text style={styles.avatarHint}>Toque na foto para alterar</Text>
        </View>

        {/* Formulário */}
        <View style={styles.formSection}>
          <Input
            label="Nome Completo:"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome completo"
            maxLength={50}
          />

          <Input
            label="E-mail:"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail (opcional)"
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={100}
          />
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonSection}>
          <Button
            title={loading ? "Salvando..." : "💾 Salvar Perfil"}
            onPress={handleSalvarPerfil}
            style={styles.saveButton}
            disabled={loading}
          />

          <View style={styles.divider} />

          <Button
            title="Exportar Dados"
            onPress={handleExportarDados}
            style={[styles.actionButton, { backgroundColor: "#4ECDC4" }]}
          />

          <Button
            title="Sobre o App"
            onPress={mostrarInfo}
            style={[styles.actionButton, { backgroundColor: "#45B7D1" }]}
          />

          <View style={styles.divider} />

          <Button
            title="Limpar Perfil"
            onPress={handleLimparPerfil}
            style={[styles.actionButton, { backgroundColor: "#FFA726" }]}
          />

          <Button
            title="Apagar Todos os Dados"
            onPress={handleLimparTodosDados}
            style={[styles.dangerButton, { backgroundColor: "#FF6B6B" }]}
            disabled={loading}
          />
        </View>

        {/* Informações do App */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Versão 1.0.0</Text>
          <Text style={styles.infoText}>Dados salvos localmente no dispositivo</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f8f9fa",
    marginBottom: 20,
  },
  avatarHint: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  formSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    marginBottom: 20,
  },
  actionButton: {
    marginBottom: 10,
  },
  dangerButton: {
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
  infoSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 5,
  },
})
