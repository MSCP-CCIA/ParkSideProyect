import React, { useState, FC } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import AuthTitle from '../../components/auth/AuthTitle';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LinkText from '../../components/common/LinkText';


interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log('Iniciar sesión con:', email, password);
  };

  const handleForgotPassword = () => {
    console.log('Olvidé mi contraseña');
  };

  const handleRegister = () => {
    console.log('Registrarse');
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
          maxLength={100} // Ejemplo de longitud máxima
        />
        <InputField
          label="Contraseña"
          placeholder="Introduce tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          type="password"
          maxLength={50} // Ejemplo de longitud máxima
        />
      <Button title="INICIAR SESIÓN" onPress={handleLogin} style={{ marginBottom: 16 }} />
      <LinkText title="He olvidado mi contraseña" onPress={handleForgotPassword} style={{ marginBottom: 8 }} />
      <LinkText title="¿No tienes cuenta? Regístrate" onPress={handleRegister} />
    </AuthLayout>
  );
};

export default LoginScreen;