import React, { useState, FC } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import AuthLayout from '../layouts/AuthLayout';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LinkText from '../../components/common/LinkText';
import Dropdown from '../../components/common/Dropdown';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios, { AxiosResponse } from 'axios';

interface RegisterResponse {
    id: number;
    full_name: string;
    email: string;
    is_active: boolean;
    parking_id: number;
    // Puedes incluir otros campos que tu backend responda
}

interface RegisterScreenProps {
    navigation: NativeStackNavigationProp<any>;
}

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
    const [documentType, setDocumentType] = useState<string>('');
    const [documentNumber, setDocumentNumber] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [documentError, setDocumentError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [registrationError, setRegistrationError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const documentTypes = ['Cédula de Ciudadanía', 'Pasaporte', 'Tarjeta de Identidad'];

    const validarCorreo = (correo: string): boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(correo);
    };

    const soloLetras = (texto: string): boolean => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);
    const soloNumeros = (texto: string): boolean => /^\d+$/.test(texto);

    const handleRegister = async () => {
        let isValid = true;

        if (!documentNumber || !soloNumeros(documentNumber)) {
            setDocumentError('Solo se permiten números sin espacios ni puntos.');
            isValid = false;
        } else {
            setDocumentError(null);
        }

        if (!name || !soloLetras(name)) {
            setNameError('El nombre solo puede contener letras.');
            isValid = false;
        } else {
            setNameError(null);
        }

        if (!lastName || !soloLetras(lastName)) {
            setLastNameError('El apellido solo puede contener letras.');
            isValid = false;
        } else {
            setLastNameError(null);
        }

        if (!email || !validarCorreo(email)) {
            setEmailError('Correo electrónico inválido. Verifica el formato.');
            isValid = false;
        } else {
            setEmailError(null);
        }

        if (!password || password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres.');
            isValid = false;
        } else {
            setPasswordError(null);
        }

        if (!documentType) {
            Alert.alert('Error', 'Por favor, selecciona un tipo de documento.');
            isValid = false;
        }

        if (isValid) {
            setLoading(true);
            setRegistrationError(null);
            try {
                const userData = {
                    id: parseInt(documentNumber, 10) || 0, // Usar el número de documento como ID
                    full_name: `${name.trim()} ${lastName.trim()}`,
                    email: email.trim(),
                    password: password,
                    is_active: true,
                    parking_id: 1,
                };

                const response: AxiosResponse<RegisterResponse> = await axios.post(
                    'http://127.0.0.1:8000/api/v1/register/',
                    userData
                );

                setLoading(false);
                console.log('Registro exitoso:', response.data);
                navigation.navigate('Login')
            } catch (error: any) {
                setLoading(false);
                console.error('Error al registrar:', error.response?.data || error.message);
                setRegistrationError(error.response?.data?.message || 'Error al registrar. Por favor, intenta de nuevo.');
                Alert.alert('Error', error.response?.data?.message || 'No se pudo registrar la cuenta.');
            }
        } else {
            Alert.alert('Error', 'Por favor, corrige los errores en el formulario.');
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
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
                label="Número de Documento"
                placeholder="Introduce tu No de documento"
                value={documentNumber}
                onChangeText={(text) => setDocumentNumber(text.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                maxLength={15}
                errorMessage={documentError}
            />
            <InputField
                label="Nombre"
                placeholder="Tu Nombre"
                value={name}
                onChangeText={setName}
                maxLength={50}
                errorMessage={nameError}
            />
            <InputField
                label="Apellido"
                placeholder="Tus Apellidos"
                value={lastName}
                onChangeText={setLastName}
                maxLength={50}
                errorMessage={lastNameError}
            />
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

            {registrationError && <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{registrationError}</Text>}

            <Button
                title={loading ? 'Registrando...' : 'REGISTRARME'}
                onPress={handleRegister}
                style={{ marginTop: 20, marginBottom: 10 }}

            />
            <LinkText title="¿Ya tienes cuenta? Inicia Sesión" onPress={handleLoginNavigation} />
        </AuthLayout>
    );
};

export default RegisterScreen;