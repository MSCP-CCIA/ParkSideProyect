import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Estado = () => {
  const [placa, setPlaca] = useState("");

  return (
    <LinearGradient colors={["#0D0D2B", "#1B1B3A"]} style={styles.container}>
      <Text style={styles.title}>ESTADO</Text>

      <Text style={styles.label}>Placa del Vehículo</Text>
      <View style={styles.placaContainer}>
        <Text style={styles.placa}>{placa || "----"}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Ingrese la placa"
        placeholderTextColor="#999"
        onChangeText={setPlaca}
        value={placa}
      />

      <Text style={styles.estadoLabel}>Estado actual del vehículo:</Text>
      <TouchableOpacity style={styles.estadoButton}>
        <Text style={styles.estadoText}>ESTACIONADO</Text>
      </TouchableOpacity>

      <Text style={styles.info}>
        Una vez que salgas del parqueadero el estado del vehículo pasará a decir
        "NO REGISTRA".
      </Text>

      <Text style={styles.subTitle}>Dejar de contar y cobrar</Text>
      <TouchableOpacity style={styles.pagarButton}>
        <Text style={styles.pagarText}>PAGAR</Text>
      </TouchableOpacity>

      <Text style={styles.aviso}>
        Importante: Solo puedes realizar el pago una vez que vayas a salir del
        parqueadero con tu vehículo, no antes.
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { color: "white", fontSize: 18 },
  placaContainer: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    minWidth: 100,
    alignItems: "center",
  },
  placa: { fontSize: 22, fontWeight: "bold" },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
    marginVertical: 10,
  },
  estadoLabel: { color: "white", marginTop: 10 },
  estadoButton: {
    borderWidth: 1,
    borderColor: "#8E44AD",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  estadoText: { color: "#8E44AD", fontWeight: "bold" },
  info: { color: "white", textAlign: "center", marginVertical: 10 },
  subTitle: { color: "white", fontSize: 18, marginTop: 20 },
  pagarButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  pagarText: { color: "white", fontWeight: "bold" },
  aviso: { color: "white", textAlign: "center", fontSize: 12 },
});

export default Estado;
