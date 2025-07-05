"use client"

import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ResumoScreen from "./screens/ResumoScreen"
import NovoGastoScreen from "./screens/NovoGastoScreen"
import HistoricoScreen from "./screens/HistoricoScreen"
import PerfilScreen from "./screens/PerfilScreen"

import Footer from "./components/Footer" 

const Tab = createBottomTabNavigator()

export default function App() {
  const [gastos, setGastos] = useState([])
  const STORAGE_KEY = "@meuGestorDeGastos:gastos"

 
  useEffect(() => {
    const loadGastos = async () => {
      try {
        const savedGastos = await AsyncStorage.getItem(STORAGE_KEY)
        if (savedGastos !== null) {
          setGastos(JSON.parse(savedGastos))
        }
      } catch (error) {
        console.error("Erro ao carregar gastos do AsyncStorage:", error)
      }
    }

    loadGastos()
  }, [])


  useEffect(() => {
    const saveGastos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(gastos))
      } catch (error) {
        console.error("Erro ao salvar gastos no AsyncStorage:", error)
      }
    }
    saveGastos()
  }, [gastos])


  const adicionarNovoGasto = (gasto) => {
    setGastos([...gastos, gasto])
  }


  const excluirGasto = (indexParaExcluir) => {
    const novosGastos = gastos.filter((_, index) => index !== indexParaExcluir)
    setGastos(novosGastos)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName

                if (route.name === "Resumo") {
                  iconName = focused ? "analytics" : "analytics-outline"
                } else if (route.name === "Nova Transação") {
                  iconName = focused ? "add-circle" : "add-circle-outline"
                } else if (route.name === "Histórico") {
                  iconName = focused ? "list" : "list-outline"
                } else if (route.name === "Perfil") {
                  iconName = focused ? "person" : "person-outline"
                }

                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: "#2196F3",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
            })}
          >
            {/* Tela de Resumo como primeira aba */}
            <Tab.Screen name="Resumo">{() => <ResumoScreen gastos={gastos} />}</Tab.Screen>

            {/* Tela de Nova Transação */}
            <Tab.Screen name="Nova Transação">
              {() => <NovoGastoScreen adicionarGasto={adicionarNovoGasto} />}
            </Tab.Screen>

            {/* Tela de Histórico */}
            <Tab.Screen name="Histórico">
              {() => <HistoricoScreen gastos={gastos} excluirGasto={excluirGasto} />}
            </Tab.Screen>

            {/* Tela de Perfil */}
            <Tab.Screen name="Perfil" component={PerfilScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
      <Footer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
})
