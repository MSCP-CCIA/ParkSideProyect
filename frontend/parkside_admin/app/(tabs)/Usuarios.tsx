import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import RefreshButton from '../../components/common/RefreshButton';
import CustomAlert from '../../components/common/CustomAlert';
import {
  getUsuarioPorId,
  updateEstadoUsuario,
} from '../../api/usuariosApi';
import {
  SearchCustomersResponse,
  SearchCustomerByIdRequest,
  UpdateCustomerStateRequest,
} from '../../models/usuarioModels';

const headers = [
  { label: 'Número de Documento', key: 'id' },
  { label: 'Nombre', key: 'full_name' },
  { label: 'Correo', key: 'email' },
  { label: 'Tipo Documento', key: 'document_type' },
  { label: 'Estado', key: 'is_active' },
];

const Usuarios = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [usuarios, setUsuarios] = useState<SearchCustomersResponse[]>([]);
  const [searchId, setSearchId] = useState('');

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const getEmployeeId = async (): Promise<number | null> => {
    const id = await AsyncStorage.getItem('userId');
    return id ? parseInt(id) : null;
  };

  const handleToggleState = async (row: SearchCustomersResponse) => {
    try {
      const employee_id = await getEmployeeId();
      if (!employee_id) throw new Error('No se encontró el ID del empleado');

      const request: UpdateCustomerStateRequest = {
        employee_id,
        customer_id: row.id,
      };
      console.log(request)
      await updateEstadoUsuario(request);

      const nuevoEstado = !row.is_active;
      const actualizados = usuarios.map((u) =>
        u.id === row.id ? { ...u, is_active: nuevoEstado } : u
      );
      setUsuarios(actualizados);

      showAlert(
        `Usuario ${row.full_name} ha sido ${nuevoEstado ? 'activado' : 'desactivado'}.`
      );
    } catch (error) {
      showAlert('Error al cambiar el estado del usuario.');
    }
  };

  const handleSearch = async () => {
    try {
      const employee_id = await getEmployeeId();
      if (!employee_id) throw new Error('No se encontró el ID del empleado');

      const request: SearchCustomerByIdRequest = {
        employee_id,
        customer_id: parseInt(searchId),
      };

      const data = await getUsuarioPorId(request);
      setUsuarios([data]);
    } catch (error) {
      showAlert('No se encontró el usuario.');
      setUsuarios([]);
    }
  };

  return (
    <DashboardLayout>
      <ScrollView>
        <Text style={styles.title}>Usuarios</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Buscar por Número de Documento"
            style={styles.searchInput}
            value={searchId}
            onChangeText={setSearchId}
            keyboardType="numeric"
          />
          <RefreshButton onPress={handleSearch} />
        </View>

        <ReusableTable
          headers={headers}
          data={usuarios.map((u) => ({
            id: u.id.toString(),
            full_name: u.full_name,
            email: u.email,
            document_type: u.document_type,
            is_active: u.is_active ? 'Activo' : 'Inactivo',
          }))}
          renderActions={(row, index) => (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleToggleState(usuarios[index])}
            >
              <Text style={styles.actionButtonText}>Activar / Desactivar</Text>
            </TouchableOpacity>
          )}
          noDataText="No hay usuarios registrados."
        />
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
    backgroundColor: '#fff',
    marginRight: 10,
  },
  actionButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Usuarios;
