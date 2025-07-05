import { Alert } from "react-native"

export const showConfirmDialog = (title, message, onConfirm, confirmText = "Confirmar") => {
  Alert.alert(title, message, [
    { text: "Cancelar", style: "cancel" },
    { text: confirmText, style: "destructive", onPress: onConfirm },
  ])
}

export const showInfoDialog = (title, message) => {
  Alert.alert(title, message, [{ text: "OK" }])
}

export const showSuccessDialog = (title, message) => {
  Alert.alert(title, message, [{ text: "OK" }])
}

export const showErrorDialog = (message) => {
  Alert.alert("Erro", message, [{ text: "OK" }])
}
