import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DashboardLayout from '../layouts/DashboardLayout';
import { getParkingApi } from '@/api/getParkingApi';
import { SearchParkingResponse, SearchParkingRequest } from '@/models/parkingModels';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Parqueadero = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [parkingData, setParkingData] = useState<SearchParkingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchParkingInfo = async () => {
    try {
      const idString = await AsyncStorage.getItem('userId');
      if (!idString) {
        Alert.alert('Error', 'No se encontró el ID del empleado.');
        setLoading(false);
        return;
      }
      const employee_id = parseInt(idString, 10);
      console.log(employee_id)
      const requestData: SearchParkingRequest = { employee_id };
      const response = await getParkingApi(requestData);
      setParkingData(response);
    } catch (error) {
      console.error('Error al obtener la información del parqueadero:', error);
      Alert.alert('Error', 'No se pudo cargar la información del parqueadero.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingInfo();
  }, []);

  const handleVerTarifas = () => {
    navigation.navigate('Tarifas');
  };

  return (
    <DashboardLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Parqueadero</Text>

        {loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          <View style={styles.infoContainer}>
            <View style={styles.leftSide}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nombre Estacionamiento:</Text>
                <View style={styles.input}>
                  <Text style={styles.inputText}>{parkingData?.name ?? 'No disponible'}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Dirección:</Text>
                <View style={styles.input}>
                  <Text style={styles.inputText}>{parkingData?.address ?? 'No disponible'}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.label}>Empresa:</Text>
                <View style={styles.input}>
                  <Text style={styles.inputText}>{parkingData?.enterprise ?? 'No disponible'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.rightSide}>
              <View style={styles.noteBox}>
                <Text style={styles.noteText}>
                  <Text style={styles.boldText}>Nota Importante: </Text>
                  Si se desea crear un nuevo parqueadero y agregarlo al registro primero se debe contactar con la empresa para validar que el estacionamiento exista.
                </Text>
              </View>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleVerTarifas}>
          <Text style={styles.buttonText}>Ver Tarifas</Text>
        </TouchableOpacity>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#1976D2',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  leftSide: {
    flex: 1,
    marginRight: 20,
  },
  rightSide: {
    flex: 1,
    alignItems: 'center',
  },
  infoRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  noteBox: {
    borderWidth: 1,
    borderColor: '#1976D2',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    backgroundColor: '#F2F8FC',
    marginTop: 10,
  },
  noteText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1976D2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Parqueadero;
