import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Avatar({ url, size = 80, onImageChange, editable = false }) {
  const defaultAvatar = "https://www.gravatar.com/avatar/?d=identicon"

  const selecionarImagem = () => {
    Alert.alert("Alterar Foto", "Escolha uma opção:", [
      { text: "Cancelar", style: "cancel" },
      { text: "Câmera", onPress: abrirCamera },
      { text: "Galeria", onPress: abrirGaleria },
      { text: "Remover Foto", onPress: removerFoto, style: "destructive" },
    ])
  }

  const abrirCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Erro", "Permissão para acessar a câmera é necessária!")
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        onImageChange(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir a câmera")
    }
  }

  const abrirGaleria = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Erro", "Permissão para acessar a galeria é necessária!")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled && result.assets[0]) {
        onImageChange(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir a galeria")
    }
  }

  const removerFoto = () => {
    onImageChange(defaultAvatar)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={editable ? selecionarImagem : null}
        style={[styles.avatarContainer, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Image
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
          source={{ uri: url || defaultAvatar }}
        />
        {editable && (
          <View style={styles.editIcon}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    backgroundColor: "#ccc",
    borderWidth: 3,
    borderColor: "#2196F3",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2196F3",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
})
