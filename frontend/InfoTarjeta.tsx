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
  const [tipoTarjeta, setTipoTarjeta] = useState("credito");

  return (
    <LinearGradient colors={["#0D0D2B", "#4B0082"]} style={styles.container}>
      <Text style={styles.title}>Agregar una tarjeta crédito/débito</Text>

      <Text style={styles.label}>Número de la tarjeta</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="**** **** **** ****"
      />

      <Text style={styles.label}>Tipo de Tarjeta</Text>
      <Picker
        selectedValue={tipoTarjeta}
        onValueChange={(value) => setTipoTarjeta(value)}
        style={styles.picker}
      >
        <Picker.Item label="Crédito" value="credito" />
        <Picker.Item label="Débito" value="debito" />
      </Picker>

      <Text style={styles.label}>Titular de la tarjeta</Text>
      <TextInput style={styles.input} placeholder="Nombre del titular" />

      <Text style={styles.label}>Fecha de vencimiento</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.inputSmall}
          placeholder="MM"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputSmall}
          placeholder="AA"
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>CVV</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        placeholder="***"
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
  picker: { backgroundColor: "white", marginTop: 5 },
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
