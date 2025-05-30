import React, { useState, FC } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthLayout from '../layouts/AuthLayout';
import AuthTitle from '../../components/Auth/AuthTitle';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LinkText from '../../components/common/LinkText';
import CustomAlert from '../../components/common/CustomAlert';
import { loginEmployee } from '@/api/loginApi';
import { SearchEmployeeRequest, SearchEmployeeResponse } from '@/models/loginModels';

interface LoginProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login: FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const validarCorreo = (correo: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
  };

  const saveLoginData = async (data: SearchEmployeeResponse) => {
    try {
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userId', data.id.toString());
    } catch (e) {
      console.error('Error al guardar sesión:', e);
    }
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setAlertVisible(true);
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

    if (isValid) {
      setLoading(true);
      setLoginError(null);
      try {
        const request: SearchEmployeeRequest = { email, password };
        const response: SearchEmployeeResponse = await loginEmployee(request);

        setLoading(false);
        await saveLoginData(response);
        navigation.navigate('Usuarios');
      } catch (error: any) {
        setLoading(false);
        const msg = error.response?.data?.message || 'Error al iniciar sesión. Por favor, intenta de nuevo.';
        setLoginError(msg);
        showAlert(msg);
      }
    } else {
      showAlert('Por favor, corrige los errores en los campos.');
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

      <CustomAlert
        message={alertMessage}
        visible={alertVisible}
        onHide={() => setAlertVisible(false)}
      />
    </AuthLayout>
  );
};

export default Login;
