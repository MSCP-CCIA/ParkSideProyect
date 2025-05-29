import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import RefreshButton from '../../components/common/RefreshButton';
import {
  SearchAllCustomerVehicles,
  SearchAllCustomerVehiclesRequest,
  SearchAllCustomerVehiclesResponse,
} from '@/models/vehicleModels';
import { getAllCustomerVehiclesApi } from '../../api/getAllCustomerVehiclesApi';

const headers = [
  { label: 'Número de Documento', key: 'customer_id' },
  { label: 'Nombre', key: 'full_name' },
  { label: 'Tipo Vehículo', key: 'vehicle_type' },
  { label: 'Correo', key: 'email' },
  { label: 'Placa', key: 'plate' },
];

const InfoVehiculos = () => {
  const [vehicles, setVehicles] = useState<SearchAllCustomerVehicles[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');

  const fetchVehicles = async () => {
    if (!searchId) {
      Alert.alert('Error', 'Por favor ingresa un número de documento para buscar.');
      return;
    }

    setLoading(true);
    try {
      const employeeIdStr = await AsyncStorage.getItem('userId');
      const employee_id = employeeIdStr ? parseInt(employeeIdStr) : null;

      if (!employee_id) {
        throw new Error('No se pudo obtener el ID del empleado.');
      }

      const customer_id = parseInt(searchId);
      if (isNaN(customer_id)) {
        throw new Error('El número de documento ingresado no es válido.');
      }

      const request: SearchAllCustomerVehiclesRequest = {
        employee_id,
        customer_id,
      };

      const response: SearchAllCustomerVehiclesResponse = await getAllCustomerVehiclesApi(request);
      setVehicles(response.vehicles);
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      Alert.alert('Error', 'No se pudo obtener la información de los vehículos.');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const mappedData = vehicles.map((v) => ({
    customer_id: String(v.customer_id),
    full_name: v.full_name,
    vehicle_type: v.vehicle_type,
    email: v.email,
    plate: v.plate,
  }));

  return (
    <DashboardLayout>
      <ScrollView>
        <Text style={styles.title}>Información vehículos</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar por Número de Documento"
            style={styles.searchInput}
            value={searchId}
            onChangeText={setSearchId}
            keyboardType="numeric"
          />
          <RefreshButton onPress={fetchVehicles} />
        </View>

        <ReusableTable
          headers={headers}
          data={mappedData}
          noDataText={loading ? 'Cargando información...' : 'No hay información de vehículos.'}
        />
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#1976D2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
});

export default InfoVehiculos;
