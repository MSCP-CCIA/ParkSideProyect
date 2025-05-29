import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createTarifaApi } from '@/api/createTarifaApi';
import { CreateHistoricalRateRequest } from '@/models/tarifaModels';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDateToMMDDYYYY = (date: Date) => {
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const CrearTarifas = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [precioCarro, setPrecioCarro] = useState('');
  const [precioMoto, setPrecioMoto] = useState('');
  const [fechaInicio, setFechaInicio] = useState(formatDateToMMDDYYYY(new Date())); // Fecha hoy
  const [errors, setErrors] = useState<{ precioCarro?: string; precioMoto?: string; fechaInicio?: string }>({});
  const [forceValidate, setForceValidate] = useState(false);

  const soloNumerosPuntos = (texto: string): boolean => /^[0-9.]+$/.test(texto);

  const validarFecha = (text: string) => {
    const regexFecha = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/20[2-9][0-9]$/;
    return regexFecha.test(text);
  };

  const handlePrecioCarroChange = (text: string) => {
    if (text === '' || soloNumerosPuntos(text)) {
      setPrecioCarro(text);
    }
  };

  const handlePrecioMotoChange = (text: string) => {
    if (text === '' || soloNumerosPuntos(text)) {
      setPrecioMoto(text);
    }
  };

  const handleFechaChange = (text: string) => {
    // Esta función ya no es necesaria si la fecha está bloqueada, pero la dejo por si acaso
    let cleaned = text.replace(/[^0-9]/g, '').slice(0, 8);
    let formatted = '';

    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }

    setFechaInicio(formatted);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    // Validar que al menos uno de los precios esté lleno
    if (!precioCarro && !precioMoto) {
      newErrors.precioCarro = 'Debe ingresar el precio del carro o el de la moto.';
      newErrors.precioMoto = 'Debe ingresar el precio del carro o el de la moto.';
      isValid = false;
    } else {
      // Si alguno está lleno, validar que los valores sean números válidos
      if (precioCarro && !soloNumerosPuntos(precioCarro)) {
        newErrors.precioCarro = 'Solo se permiten números y puntos.';
        isValid = false;
      }
      if (precioMoto && !soloNumerosPuntos(precioMoto)) {
        newErrors.precioMoto = 'Solo se permiten números y puntos.';
        isValid = false;
      }
    }

    if (!fechaInicio) {
      newErrors.fechaInicio = 'La fecha es obligatoria.';
      isValid = false;
    } else if (!validarFecha(fechaInicio)) {
      newErrors.fechaInicio = 'Formato inválido. Usa MM/DD/YYYY (mes 01-12, día 01-31, año >= 2025).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreate = async () => {
    setForceValidate(true);

    if (!validateForm()) return;

    try {
      const idString = await AsyncStorage.getItem('userId');
      if (!idString) {
        Alert.alert('Error', 'No se encontró el ID del empleado.');
        return;
      }
      const employee_id = parseInt(idString, 10);

      const formattedDate = (() => {
        const [mm, dd, yyyy] = fechaInicio.split('/');
        return `${yyyy}-${mm}-${dd}`;
      })();

      const payload: CreateHistoricalRateRequest = {
        employee_id,
        car_rate: precioCarro ? parseFloat(precioCarro) : null,
        motorbike_rate: precioMoto ? parseFloat(precioMoto) : null,
        start_date: formattedDate,
      };

      await createTarifaApi(payload);
      Alert.alert('Éxito', 'Tarifa creada exitosamente.');
      navigation.navigate('Tarifas');
    } catch (error) {
      console.error('Error al crear la tarifa:', error);
      Alert.alert('Error', 'No se pudo crear la tarifa. Intenta nuevamente.');
    }
  };

  const handleCancel = () => {
    navigation.navigate('Tarifas');
  };

  return (
    <DashboardLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <ValidatedTextInput
          label="Precio Carro"
          value={precioCarro}
          onChangeText={handlePrecioCarroChange}
          keyboardType="numeric"
          validationRules={{ required: false }}
          forceValidate={forceValidate}
        />
        {errors.precioCarro && <Text style={styles.error}>{errors.precioCarro}</Text>}

        <ValidatedTextInput
          label="Precio Moto"
          value={precioMoto}
          onChangeText={handlePrecioMotoChange}
          keyboardType="numeric"
          validationRules={{ required: false }}
          forceValidate={forceValidate}
        />
        {errors.precioMoto && <Text style={styles.error}>{errors.precioMoto}</Text>}

        <ValidatedTextInput
          label="Fecha Inicio"
          placeholder="MM/DD/YYYY"
          value={fechaInicio}
          onChangeText={handleFechaChange}
          keyboardType="numeric"
          validationRules={{ required: true }}
          forceValidate={forceValidate}
          editable={false} // bloquea la edición
        />
        {errors.fechaInicio && <Text style={styles.error}>{errors.fechaInicio}</Text>}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={handleCreate}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>CANCELAR</Text>
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
  buttonsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#178591',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default CrearTarifas;
