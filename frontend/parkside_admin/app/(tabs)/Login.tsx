import React, { useState, FC } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthLayout from '../layouts/AuthLayout';
import AuthTitle from '../../components/Auth/AuthTitle';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LinkText from '../../components/common/LinkText';
import { loginEmployee } from '../../api/loginApi';
import { SearchEmployeeRequest } from '@/models/loginModels';

interface LoginProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login: FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validarCorreo = (correo: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  };

  const handleLogin = async () => {
    let isValid = true;

    if (!email) {
      setEmailError('Por favor, introduce tu correo electrónico.');
      isValid = false;
    } else if (!validarCorreo(email)) {
      setEmailError('Correo electrónico inválido. Verifica el formato.');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError('Por favor, introduce tu contraseña.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!isValid) {
      Alert.alert('Error', 'Corrige los errores en los campos.');
      return;
    }

    const credentials: SearchEmployeeRequest = {
      email,
      password,
    };

    try {
      const response = await loginEmployee(credentials);
      await AsyncStorage.setItem('authToken', response.token);
      await AsyncStorage.setItem('authUserId', response.id.toString());

      Alert.alert('Inicio de sesión exitoso');
      navigation.navigate('Usuarios');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Correo o contraseña incorrectos.');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <AuthLayout>
      <AuthTitle />
      <InputField
        label="Correo"
        placeholder="example@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        type="email"
        maxLength={100}
        errorMessage={emailError}
      />
      <InputField
        label="Contraseña"
        placeholder="Introduce tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        type="password"
        maxLength={50}
        errorMessage={passwordError}
      />
      <Button title="INICIAR SESIÓN" onPress={handleLogin} style={{ marginBottom: 16 }} />
      <LinkText title="He olvidado mi contraseña" onPress={handleForgotPassword} style={{ marginBottom: 8 }} />
    </AuthLayout>
  );
};

export default Login;
