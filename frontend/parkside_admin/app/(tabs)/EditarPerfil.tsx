import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePerfil } from '../../api/editarPerfilApi';
import { UpdateEmployeeRequest } from '../../models/editarPerfilModels';

const EditarPerfil = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('Cédula de Ciudadanía');
  const [numeroDocumento, setNumeroDocumento] = useState('123456789');
  const [correo, setCorreo] = useState('admin@email.com');
  const [forceValidate, setForceValidate] = useState(false);
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    const obtenerId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setEmployeeId(parseInt(id));
      }
    };
    obtenerId();
  }, []);

  const soloLetras = (texto: string): boolean =>
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);

  const handleSave = async () => {
    setForceValidate(true);

    if (!nombre || !apellido) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!soloLetras(nombre) || !soloLetras(apellido)) {
      Alert.alert('Error', 'Nombre y Apellido solo deben contener letras.');
      return;
    }

    if (!employeeId) {
      Alert.alert('Error', 'No se pudo obtener el ID del usuario.');
      return;
    }

    const full_name = `${nombre.trim()} ${apellido.trim()}`;

    const data: UpdateEmployeeRequest = {
      id: employeeId,
      full_name,
    };

    try {
      await updatePerfil(data);
      Alert.alert('Perfil actualizado', 'Los cambios se han guardado correctamente.');
      navigation.navigate('Usuarios');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil.');
    }
  };

  const handleCancel = () => {
    navigation.navigate('Usuarios');
  };

  return (
    <DashboardLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <ValidatedTextInput
          label="Tipo de Documento"
          value={tipoDocumento}
          onChangeText={() => {}}
          editable={false}
          style={styles.disabledInput}
        />
        <ValidatedTextInput
          label="Número de Documento"
          value={numeroDocumento}
          onChangeText={() => {}}
          editable={false}
          style={styles.disabledInput}
        />
        <ValidatedTextInput
          label="Correo"
          value={correo}
          onChangeText={() => {}}
          editable={false}
          style={styles.disabledInput}
        />
        <ValidatedTextInput
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          validationRules={{ required: true, pattern: /^[a-zA-Z\s]+$/ }}
          forceValidate={forceValidate}
        />
        <ValidatedTextInput
          label="Apellido"
          value={apellido}
          onChangeText={setApellido}
          validationRules={{ required: true, pattern: /^[a-zA-Z\s]+$/ }}
          forceValidate={forceValidate}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>CANCELAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={handleSave}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#178591',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditarPerfil;
