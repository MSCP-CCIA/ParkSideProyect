import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';

import { SearchMyInformationRequest, SearchMyInformationResponse, UpdateCustomerRequest } from '../../models/customer_models';
import { Message } from '../../models/message_models';
import { getInfoUser } from '../../api/getInfoUserApi'; // asumo que tienes la función que consulta /customer/info
import { updateUser } from '../../api/updateUserApi';
import AsyncStorage from "@react-native-async-storage/async-storage"; // y la que hace update

interface EditProfileScreenProps {
  navigation: any;
  route: any;
}

const EditProfileScreen: FC<EditProfileScreenProps> = ({ navigation, route }) => {
  // Estado para el id del usuario (para la actualización)
  const [userId, setUserId] = useState<number | null>(null);

  // Datos que se muestran y editan
  const [documentType, setDocumentType] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  // Para separar nombre y apellido y validarlos
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  // Estados de error y carga
  const [nameError, setNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(true); // carga inicial

  // Validación solo letras (incluye espacios y caracteres acentuados)
  const soloLetras = (texto: string): boolean => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);

  // Separar fullName en nombre y apellido al cargar datos
  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 0) {
      return ['', ''];
    }
    if (parts.length === 1) {
      return [parts[0], ''];
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return [firstName, lastName];
  };

  // Cargar info usuario desde API al montar
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoadingInfo(true);
      try {
        const idString = await AsyncStorage.getItem('userId');
            if (!idString) {
              throw new Error('No se encontró el id del usuario en el almacenamiento local');
            }
        const id = parseInt(idString, 10);

        const request: SearchMyInformationRequest = {
          id: id,
        };

        const response: SearchMyInformationResponse = await getInfoUser(request);
        console.log(response)
        setUserId(response.id);
        setDocumentType(response.document_type);
        setEmail(response.email);
        setFullName(response.full_name);

        const [first, last] = splitFullName(response.full_name);
        setName(first);
        setLastName(last);

        setLoadingInfo(false);
      } catch (error: any) {
        setLoadingInfo(false);
        console.error('Error al cargar info del usuario:', error.message || error);
        Alert.alert('Error', 'No se pudo cargar la información del usuario.');
      }
    };

    fetchUserInfo();
  }, [route.params]);

  const handleNameChange = (text: string) => {
    setName(text);
    setNameError(!soloLetras(text) ? 'El nombre solo debe contener letras.' : null);
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
    setLastNameError(!soloLetras(text) ? 'El apellido solo debe contener letras.' : null);
  };

  const handleSaveProfile = async () => {
    let isValid = true;

    if (!soloLetras(name) || name.trim() === '') {
      setNameError('El nombre solo debe contener letras.');
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!soloLetras(lastName) || lastName.trim() === '') {
      setLastNameError('El apellido solo debe contener letras.');
      isValid = false;
    } else {
      setLastNameError(null);
    }

    if (!userId) {
      Alert.alert('Error', 'No se ha cargado el usuario correctamente.');
      return;
    }

    if (isValid) {
      setLoading(true);
      setUpdateError(null);
      try {
        const fullNameUpdated = `${name.trim()} ${lastName.trim()}`;

        const updateData: UpdateCustomerRequest = {
          id: userId,
          full_name: fullNameUpdated,
        };

        const response: Message = await updateUser(updateData);

        setLoading(false);
        Alert.alert('Perfil actualizado', response.message || 'Los cambios se han guardado correctamente.');
        navigation.goBack();
      } catch (error: any) {
        setLoading(false);
        console.error('Error al actualizar el perfil:', error.response?.data || error.message);
        const msg = error.response?.data?.message || 'Error al actualizar el perfil. Por favor, intenta de nuevo.';
        setUpdateError(msg);
        Alert.alert('Error', msg);
      }
    }
  };

  if (loadingInfo) {
    return (
      <ScreenLayout title="Perfil" navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Cargando información...</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Perfil" navigation={navigation}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <View style={styles.formContainer}>
          <ValidatedTextInput
            label="Tipo de Documento"
            value={documentType}
            editable={false}
            style={styles.disabledInput}
            onChangeText={() => {}}
          />
          <ValidatedTextInput
            label="Correo"
            value={email}
            editable={false}
            keyboardType="email-address"
            style={styles.disabledInput}
            onChangeText={() => {}}
          />
          <ValidatedTextInput
            label="Nombre"
            value={name}
            onChangeText={handleNameChange}
            keyboardType="default"
          />
          {nameError && <Text style={styles.error}>{nameError}</Text>}

          <ValidatedTextInput
            label="Apellido"
            value={lastName}
            onChangeText={handleLastNameChange}
            keyboardType="default"
          />
          {lastNameError && <Text style={styles.error}>{lastNameError}</Text>}

          {/* Aquí puedes agregar más campos si quieres */}

          {updateError && <Text style={styles.error}>{updateError}</Text>}

          <TouchableOpacity style={styles.acceptButton} onPress={handleSaveProfile} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'ACEPTAR'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: 'gray',
  },
  acceptButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProfileScreen;
