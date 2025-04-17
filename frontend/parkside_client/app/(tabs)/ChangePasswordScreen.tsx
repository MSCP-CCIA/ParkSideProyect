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

interface ChangePasswordScreenProps {
  navigation: any;
}

const ChangePasswordScreen: FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const validarCorreo = (correo: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!validarCorreo(text)) {
      setEmailError('Correo inválido. Verifica el formato.');
    } else {
      setEmailError(null);
    }
  };

  const handleAccept = () => {
    if (!email || !validarCorreo(email)) {
      setEmailError('Por favor ingresa un correo válido.');
      return;
    }

    setEmailError(null);
    console.log('Solicitando cambio de contraseña para:', email);
    Alert.alert(
        'Correo enviado',
        'Se ha enviado un enlace para cambiar la contraseña a tu correo.'
    );
    navigation.goBack();
  };

  return (
      <ScreenLayout title="Cambio de contraseña" navigation={navigation}>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.instructionText}>
              Por favor ingresa tu correo electrónico para cambiar tu contraseña
            </Text>
            <ValidatedTextInput
                label="Correo"
                placeholder="example@email.com"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
                style={styles.input}
            />
            {emailError && <Text style={styles.error}>{emailError}</Text>}

            <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    backgroundColor: '#f0f8ff',
  },
  contentContainer: {
    width: '100%',
    marginTop: 40,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  acceptButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
