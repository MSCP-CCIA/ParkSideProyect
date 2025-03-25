import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Movimientos = () => {
  const data = [
    { fecha: "07/01/2025", placa: "INL34H", pago: "-15.000 $" },
    { fecha: "14/02/2025", placa: "INL34H", pago: "-15.000 $" },
    { fecha: "23/01/2025", placa: "CQV532", pago: "-15.000 $" },
  ];

  return (
    <LinearGradient colors={["#0D0D2B", "#4B0082"]} style={styles.container}>
      <Text style={styles.title}>MOVIMIENTOS</Text>
      <Text style={styles.subTitle}>Historial de Parqueos</Text>
      <View style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.headerText}>Fecha</Text>
          <Text style={styles.headerText}>Placa</Text>
          <Text style={styles.headerText}>Pagos</Text>
        </View>
        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.fecha}</Text>
            <Text style={styles.cell}>{item.placa}</Text>
            <Text style={styles.cell}>{item.pago}</Text>
          </View>
        ))}
      </View>
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
  },
  subTitle: { color: "white", textAlign: "center", marginBottom: 20 },
  table: { marginTop: 10 },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#8E44AD",
    paddingBottom: 5,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  cell: { color: "white", flex: 1, textAlign: "center" },
});

export default Movimientos;
