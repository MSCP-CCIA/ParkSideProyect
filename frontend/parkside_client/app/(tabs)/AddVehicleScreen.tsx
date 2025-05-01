import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

// Layout
import ScreenLayout from '../layouts/ScreenLayout';

// Components
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import Dropdown from '../../components/common/Dropdown';

// Models
import { CreateVehicleRequest } from '../../models/vehicle_models';

// API Services
import { registerVehicle } from '../../core/register_vehicle';

// Props Interface
interface AddVehicleScreenProps {
  navigation: any;
}

const AddVehicleScreen: FC<AddVehicleScreenProps> = ({ navigation }) => {
  // State Hooks
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [plateError, setPlateError] = useState<string | null>(null);

  // Data
  const vehicleTypes = ['Carro', 'Motocicleta'];

  // Event Handlers
  const handleVehicleTypeChange = (value: string) => {
    setSelectedVehicleType(value);
    setPlateError(null); // Clear error on type change
  };

  const handleVehiclePlateChange = (text: string) => {
    const upper = text.toUpperCase().slice(0, 6);
    setVehiclePlate(upper);
    setPlateError(null); // Clear error on text change
  };

  // Validation
  const validatePlate = (): boolean => {
    if (!selectedVehicleType) {
      setPlateError('Selecciona un tipo de vehículo primero.');
      return false;
    }

    const plate = vehiclePlate.toUpperCase();
    const regexCarro = /^[A-Z]{3}[0-9]{3}$/;
    const regexMoto = /^[A-Z]{3}[0-9]{2}[A-Z]$/;

    if (selectedVehicleType === 'Carro' && !regexCarro.test(plate)) {
      setPlateError('La placa debe tener el formato ABC123.');
      return false;
    } else if (selectedVehicleType === 'Motocicleta' && !regexMoto.test(plate)) {
      setPlateError('La placa debe tener el formato ABC12D.');
      return false;
    }

    return true;
  };

  // API Request Object Creation
  const createVehicleRequestObject = (
    vehiclePlate: string,
    selectedVehicleType: string
  ): CreateVehicleRequest => {
    return {
      plate: vehiclePlate,
      type: selectedVehicleType,
      customer_id: 1000000001,
    };
  };

  // API Call Handler
  const handleAccept = async () => {
    if (validatePlate()) {
      const createVehicleRequest = createVehicleRequestObject(vehiclePlate, selectedVehicleType);
      console.log(createVehicleRequest);
      try {
        const response = await registerVehicle(createVehicleRequest);
        console.log('Respuesta del servidor:', response.data);
        Alert.alert('Vehículo registrado correctamente');
        navigation.navigate('MyVehiclesScreen');
      } catch (error: any) {
        Alert.alert('Error', 'No se pudo registrar el vehículo. Por favor, intenta de nuevo.');
      }
    }
  };

  // Render
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