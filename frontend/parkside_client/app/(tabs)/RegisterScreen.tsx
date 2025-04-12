import React, { useState, FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LinkText from '../../components/common/LinkText';
import Dropdown from '../../components/common/Dropdown';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta librería
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importa el tipo correcto

interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<any>; // Reemplaza 'any' con el tipo correcto
}

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const [documentType, setDocumentType] = useState<string>('');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const documentTypes = ['Cédula de Ciudadanía', 'Pasaporte', 'Tarjeta de Identidad']; // Ejemplo de tipos de documento

  const handleRegister = () => {
    // Aquí iría la lógica para registrar al usuario
    console.log('Registrando con:', { documentType, documentNumber, name, lastName, email, password });
    // Navegar a otra pantalla después del registro exitoso, por ejemplo:
    // navigation.navigate('Home');
  };

  const handleGoBack = () => {
    navigation.goBack(); // Volver a la pantalla anterior (probablemente Login)
  };

  const handleLoginNavigation = () => {
    navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
  };

  return (
    <AuthLayout>
      <TouchableOpacity onPress={handleGoBack} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>Registro</Text>

      <Dropdown
        label="Tipo de Documento"
        value={documentType}
        items={documentTypes}
        onValueChange={setDocumentType}
      />
      <InputField
        label="Numero de Documento"
        placeholder="Introduce tu No de documento"
        value={documentNumber}
        onChangeText={setDocumentNumber}
        keyboardType="numeric"
      />
      <InputField
        label="Nombre"
        placeholder="Tu Nombre"
        value={name}
        onChangeText={setName}
      />
      <InputField
        label="Apellido"
        placeholder="Tus Apellidos"
        value={lastName}
        onChangeText={setLastName}
      />
      <InputField
        label="Correo"
        placeholder="example@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        type="email"
      />
      <InputField
        label="Contraseña"
        placeholder="Introduce tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        type="password"
      />

      <Button title="REGISTRARME" onPress={handleRegister} style={{ marginTop: 20, marginBottom: 10 }} />
      <LinkText title="¿Ya tienes cuenta? Inicia Sesión" onPress={handleLoginNavigation} />
    </AuthLayout>
  );
};

export default RegisterScreen;