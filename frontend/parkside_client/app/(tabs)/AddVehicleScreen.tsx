import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import Dropdown from '../../components/common/Dropdown';
import { registerVehicle } from '../../core/register_vehicle';
import {addVehicle} from '../../api/addVehicleApi'
import {CreateVehicleRequest} from '../../models/vehicle_models'
import {Message} from '../../models/message_models'

interface AddVehicleScreenProps {
  navigation: any;
}

const AddVehicleScreen: FC<AddVehicleScreenProps> = ({ navigation }) => {
  // State Hooks
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [plateError, setPlateError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Para mostrar un indicador de carga

  // Data
  const vehicleTypes = ['Carro', 'Motocicleta'];

    // Obtener el customer_id del AsyncStorage
    useEffect(() => {
      const getCustomerIdFromStorage = async () => {
        try {
          const storedData = await AsyncStorage.getItem('authToken');
          if (storedData) {
            const idString = await AsyncStorage.getItem('userId');
            const id = idString ? parseInt(idString, 10) : null;
            setCustomerId(id);
          } else {
            // Manejar el caso en que no hay datos de inicio de sesión
            Alert.alert('Error', 'No se ha iniciado sesión. Por favor, inicie sesión.');
            navigation.navigate('Login'); // Redirigir a la pantalla de inicio de sesión
          }
        } catch (error) {
          console.error('Error al obtener el ID del cliente:', error);
          Alert.alert('Error', 'No se pudo obtener la información del usuario.');
          navigation.navigate('Login');
        }
      };
      getCustomerIdFromStorage();
    }, [navigation]);

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


  // API Call Handler
  const handleAccept = async () => {
    if (validatePlate() && customerId) {
      setLoading(true);
      const request: CreateVehicleRequest = {
          plate: vehiclePlate.trim(),
          type: selectedVehicleType.trim(),
          customer_id: customerId,
      }
      try {
        const response = await addVehicle(request);
        Alert.alert('Vehículo registrado correctamente');
        navigation.navigate('MyVehiclesScreen');
      } catch (error: any) {
        setLoading(false);
        console.error("Error al registrar el vehiculo", error)
        Alert.alert('Error', 'No se pudo registrar el vehículo. Por favor, intenta de nuevo.');
      }
    } else if (!customerId) {
        Alert.alert('Error', 'No se ha iniciado sesión. Por favor, inicie sesión.');
        navigation.navigate('Login');
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

          <TouchableOpacity
            style={styles.acceptButton}
            onPress={handleAccept}
            disabled={loading} // Deshabilita el botón durante la carga
          >
            <Text style={styles.buttonText}>
              {loading ? 'Registrando...' : 'ACEPTAR'} {/* Muestra un texto diferente durante la carga */}
            </Text>
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
