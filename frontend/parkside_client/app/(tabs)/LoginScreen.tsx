import React, { useState, FC } from 'react';
import { Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AuthLayout from '../layouts/AuthLayout';
import AuthTitle from '../../components/auth/AuthTitle';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LinkText from '../../components/common/LinkText';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<any>; // Ajusta 'any' con tu tipo de navegación
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validarCorreo = (correo: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  };

  const handleLogin = () => {
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

    if (isValid) {
      console.log('Iniciando sesión con:', email, password);
      navigation.navigate('MainMenu');
    } else {
      Alert.alert('Error', 'Por favor, corrige los errores en los campos.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Olvidé mi contraseña');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
        <LinkText title="¿No tienes cuenta? Regístrate" onPress={handleRegister} />
      </AuthLayout>
  );
};

export default LoginScreen;