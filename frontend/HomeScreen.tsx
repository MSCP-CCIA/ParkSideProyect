import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen: React.FC = () => {
  return (
    <LinearGradient colors={["#000000", "#ff00ff"]} style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>
        Escoge alguna de las siguientes opciones:
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ESTADO</Text>
        <Text style={styles.description}>
          Revisa en tiempo real el estado de tu vehículo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>AGREGAR TARJETA</Text>
        <Text style={styles.description}>
          Agrega un método de pago para pagar tu estadía del parqueadero
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>INFORMACIÓN DEL VEHÍCULO</Text>
        <Text style={styles.description}>
          Ingresa la información importante de tu vehículo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>MOVIMIENTOS</Text>
        <Text style={styles.description}>
          Revisa el historial de parqueos que hayas hecho
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
});

export default HomeScreen;
