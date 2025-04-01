import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

const InfoTarjeta = () => {
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");

  const detectarTipoTarjeta = (numero) => {
    setNumeroTarjeta(numero);
    if (/^4/.test(numero)) {
      setTipoTarjeta("Visa");
    } else if (/^5[1-5]/.test(numero)) {
      setTipoTarjeta("MasterCard");
    } else if (/^3[47]/.test(numero)) {
      setTipoTarjeta("American Express");
    } else {
      setTipoTarjeta("Desconocida");
    }
  };

  return (
    <LinearGradient colors={["#0D0D2B", "#4B0082"]} style={styles.container}>
      <Text style={styles.title}>Agregar una tarjeta crédito/débito</Text>

      <Text style={styles.label}>Número de la tarjeta ({tipoTarjeta})</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="**** **** **** ****"
        maxLength={16}
        value={numeroTarjeta}
        onChangeText={detectarTipoTarjeta}
      />

      <Text style={styles.label}>Titular de la tarjeta</Text>
      <TextInput style={styles.input} placeholder="Nombre del titular" />

      <Text style={styles.label}>Fecha de vencimiento</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputSmall}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={styles.inputSmall}
          placeholder="AA"
          keyboardType="numeric"
          maxLength={2}
        />
      </View>

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        placeholder="***"
        maxLength={4}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SIGUIENTE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>CANCELAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { color: "white", marginTop: 10 },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  inputSmall: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "48%",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#4B0082",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: { color: "white", textAlign: "center" },
});

export default InfoTarjeta;
