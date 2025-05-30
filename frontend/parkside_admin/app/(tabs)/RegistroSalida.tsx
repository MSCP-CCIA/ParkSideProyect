import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardLayout from '../layouts/DashboardLayout';
import SelectableTable from '../../components/common/SelectableTable';
import RefreshButton from '../../components/common/RefreshButton';
import CustomAlert from '../../components/common/CustomAlert';
import { getRegistroSalida } from '../../api/registroSalidaApi';
import { liberarSalida } from '../../api/liberarSalidaApi';
import {
  SearchRegistrationByPlateRequest,
  SearchRegistrationByPlateResponse,
} from '@/models/registroSalidaModels';

const headers = [
  { label: 'Número de Documento', key: 'numeroDocumento' },
  { label: 'Nombre', key: 'nombre' },
  { label: 'Tipo Vehículo', key: 'tipoVehiculo' },
  { label: 'Correo', key: 'correo' },
  { label: 'Placa', key: 'placa' },
];

const RegistroSalida = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [placa, setPlaca] = useState('');
  const [result, setResult] = useState<any[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleSelectRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSearch = async () => {
    if (!placa) {
      Alert.alert('Error', 'Por favor ingresa una placa para buscar.');
      return;
    }

    try {
      const employeeIdStr = await AsyncStorage.getItem('userId');
      const employee_id = employeeIdStr ? parseInt(employeeIdStr) : null;

      if (!employee_id) throw new Error('No se encontró el ID del empleado');

      const request: SearchRegistrationByPlateRequest = {
        employee_id,
        plate: placa.toUpperCase(),
      };

      const data: SearchRegistrationByPlateResponse = await getRegistroSalida(request);

      const mapped = {
        numeroDocumento: data.customer_id.toString(),
        nombre: data.customer_full_name,
        tipoVehiculo: data.vehicle_type,
        correo: data.customer_email,
        placa: data.vehicle_plate,
      };

      setResult([mapped]);
      setSelectedRows([]);
    } catch (error) {
      console.error('Error al buscar vehículo:', error);
      Alert.alert('No encontrado', 'No se encontró información para esta placa.');
      setResult([]);
      setSelectedRows([]);
    }
  };

  const handleLiberarSalida = async () => {
    try {
      if (result.length === 0) return;

      const plate = result[0].placa.toUpperCase();

      const response = await liberarSalida({ plate });

      // Mensaje personalizado del backend
      showAlert(`Vehículo ${plate}: ${response.message}`);
    } catch (error: any) {
      console.error('Error al liberar salida:', error);
      showAlert('Error: No se pudo registrar la salida del vehículo.');
    }
  };

  return (
    <DashboardLayout>
      <ScrollView>
        <Text style={styles.title}>Registro Salida</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar por Placa del vehículo"
            style={styles.searchInput}
            value={placa}
            onChangeText={setPlaca}
            autoCapitalize="characters"
          />
          <RefreshButton onPress={handleSearch} />
        </View>

        <SelectableTable
          headers={headers}
          data={result}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
        />

        <TouchableOpacity
          style={[styles.actionButton, result.length === 0 && styles.disabledButton]}
          disabled={result.length === 0}
          onPress={handleLiberarSalida}
        >
          <Text style={styles.buttonText}>Liberar salida del parqueadero</Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomAlert
        message={alertMessage}
        visible={alertVisible}
        onHide={() => setAlertVisible(false)}
      />
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
  actionButton: {
    marginTop: 24,
    backgroundColor: '#1976D2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RegistroSalida;
