import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validarCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  };

  const handleRegister = () => {
    if (!nombre || !apellidos || !email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (!validarCorreo(email)) {
      Alert.alert(
        "Error",
        "Correo inválido. Usa solo letras, números y puntos."
      );
      return;
    }

    console.log("Registrando usuario con:", { nombre, apellidos, email });
  };

  return (
    <LinearGradient colors={["#1a0025", "#45005a"]} style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu Nombre"
        placeholderTextColor="#999"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Tus Apellidos"
        placeholderTextColor="#999"
        value={apellidos}
        onChangeText={setApellidos}
      />
      <TextInput
        style={styles.input}
        placeholder="example@email.com"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Introduce tu contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>REGISTRARME</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: { position: "absolute", top: 40, left: 20 },
  title: { fontSize: 28, color: "#fff", fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff00ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loginText: { color: "#fff", marginTop: 15, fontWeight: "bold" },
});
