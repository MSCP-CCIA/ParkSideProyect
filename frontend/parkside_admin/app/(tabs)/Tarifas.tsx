import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReusableTable from '../../components/common/ReusableTable';
import { getTarifasApi } from '../../api/getTarifasApi';
import { SearchHistoricalRateResponse } from '@/models/tarifaModels';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headers = [
  { label: 'Precio Carro', key: 'precioCarro' },
  { label: 'Precio Moto', key: 'precioMoto' },
  { label: 'Fecha Inicio', key: 'fechaInicio' },
  { label: 'Fecha Fin', key: 'fechaFin' },
];

const Tarifas = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [tarifas, setTarifas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTarifas = async () => {
    setLoading(true);
    try {
      const idString = await AsyncStorage.getItem('userId');
      if (!idString) {
        Alert.alert('Error', 'No se encontró el ID del empleado.');
        setLoading(false);
        return;
      }
      const employee_id = parseInt(idString, 10);

      const response = await getTarifasApi({ employee_id });

      const mapped = response.historicalRates.map(
        (item: SearchHistoricalRateResponse) => ({
          precioCarro: `$${item.car_rate.toLocaleString()}`,
          precioMoto: `$${item.motorbike_rate.toLocaleString()}`,
          fechaInicio: new Date(item.start_date).toLocaleDateString(),
          fechaFin: item.end_date
            ? new Date(item.end_date).toLocaleDateString()
            : 'Actual',
        })
      );

      setTarifas(mapped);
    } catch (error) {
      console.error('Error al obtener tarifas:', error);
      Alert.alert('Error', 'No se pudieron cargar las tarifas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarifas();
  }, []);

  const handleCreateTarifa = () => {
    navigation.navigate('CrearTarifas');
  };

  return (
    <DashboardLayout>
      <ScrollView>
        <Text style={styles.title}>Tarifas</Text>

        <ReusableTable
          headers={headers}
          data={tarifas}
          noDataText={loading ? 'Cargando tarifas...' : 'No hay tarifas registradas.'}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleCreateTarifa}>
          <Text style={styles.createButtonText}>Crear nueva Tarifa</Text>
        </TouchableOpacity>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  createButton: {
    marginTop: 24,
    backgroundColor: '#1976D2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tarifas;
