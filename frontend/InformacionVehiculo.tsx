import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

const InformacionVehiculo: React.FC = () => {
  const [cedula, setCedula] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [placa, setPlaca] = useState("");

  const handleSiguiente = () => {
    if (!cedula || !tipoVehiculo || !placa) {
      Alert.alert(
        "Error",
        "Por favor llenar todos los campos de la información del vehículo"
      );
    } else {
      Alert.alert(
        "Éxito",
        "La información del vehículo se ha agregado correctamente"
      );
    }
  };

  return (
    <LinearGradient colors={["#0D0D0D", "#211E4E"]} style={styles.container}>
      <Text style={styles.title}>Información del vehículo</Text>

      <Text style={styles.label}>Cédula del propietario</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la cédula"
        placeholderTextColor="#B9A0E6"
        keyboardType="numeric"
        value={cedula}
        onChangeText={setCedula}
      />

      <Text style={styles.label}>Tipo de vehículo</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoVehiculo}
          onValueChange={(itemValue) => setTipoVehiculo(itemValue)}
          style={styles.picker}
          dropdownIconColor="#B9A0E6"
        >
          <Picker.Item label="Seleccione el tipo" value="" />
          <Picker.Item label="Carro" value="Carro" />
          <Picker.Item label="Moto" value="Moto" />
        </Picker>
      </View>

      <Text style={styles.label}>Placa del vehículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la placa"
        placeholderTextColor="#B9A0E6"
        value={placa}
        onChangeText={setPlaca}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSiguiente}>
        <Text style={styles.buttonText}>SIGUIENTE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonText}>CANCELAR</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#B9A0E6",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#B9A0E6",
    borderRadius: 8,
    padding: 10,
    color: "#FFFFFF",
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#B9A0E6",
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    color: "#FFFFFF",
  },
  buttonPrimary: {
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondary: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformacionVehiculo;
