import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import Dropdown from '../../components/common/Dropdown';
import { CreateVehicleRequest } from '../../models/vehicle_models';
import axios from 'axios';
interface AddVehicleScreenProps {
  navigation: any;
}

const AddVehicleScreen: FC<AddVehicleScreenProps> = ({ navigation }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [plateError, setPlateError] = useState<string | null>(null);

  const vehicleTypes = ['Carro', 'Motocicleta'];

  const handleVehicleTypeChange = (value: string) => {
    setSelectedVehicleType(value);
    setPlateError(null); // Limpiar error al cambiar tipo
  };

  const handleVehiclePlateChange = (text: string) => {
    const upper = text.toUpperCase().slice(0, 6);
    setVehiclePlate(upper);
    setPlateError(null); // Limpiar error al escribir
  };

  const validatePlate = (): boolean => {
    let valid = true;
    if (!selectedVehicleType) {
      setPlateError('Selecciona un tipo de vehículo primero.');
      return false;
    }

    const plate = vehiclePlate.toUpperCase();
    const regexCarro = /^[A-Z]{3}[0-9]{3}$/;
    const regexMoto = /^[A-Z]{3}[0-9]{2}[A-Z]$/;

    if (selectedVehicleType === 'Carro' && !regexCarro.test(plate)) {
      setPlateError('La placa debe tener el formato ABC123.');
      valid = false;
    } else if (selectedVehicleType === 'Motocicleta' && !regexMoto.test(plate)) {
      setPlateError('La placa debe tener el formato ABC12D.');
      valid = false;
    }

    return valid;
  };

  const handleAccept = async () => {
    if (validatePlate()) {
      const createVehicleRequest: CreateVehicleRequest = {
        plate: vehiclePlate,
        type: selectedVehicleType,
        customer_id: 12345,
      };
      try {
        // Enviar la petición POST usando axios
        const response = await axios.post('http://127.0.0.1:8000/register-vehicle/', createVehicleRequest); // Reemplazar 'URL_DEL_ENDPOINT'
        console.log('Respuesta del servidor:', response.data);
        Alert.alert('Vehículo registrado correctamente');
        navigation.goBack();

      } catch (error: any) {
        console.error('Error al registrar el vehículo:', error);
        Alert.alert('Error', 'No se pudo registrar el vehículo. Por favor, intenta de nuevo.');
      }
      console.log('Vehículo agregado:', {selectedVehicleType, vehiclePlate});
      Alert.alert('Vehículo registrado correctamente');
      navigation.goBack();
    }
  };

  return (
      <ScreenLayout title="Agregar Vehículo" navigation={navigation}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <View style={styles.formContainer}>
            <Dropdown
                label="Tipo"
                value={selectedVehicleType}
                items={vehicleTypes}
                onValueChange={handleVehicleTypeChange}
            />

            <ValidatedTextInput
                label="Placa"
                placeholder="ABC123 / ABC12D"
                value={vehiclePlate}
                onChangeText={handleVehiclePlateChange}
                keyboardType="default"
                style={styles.input}
            />
            {plateError && <Text style={styles.error}>{plateError}</Text>}

            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.buttonText}>ACEPTAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>CANCELAR</Text>
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
  input: {
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  acceptButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddVehicleScreen;
