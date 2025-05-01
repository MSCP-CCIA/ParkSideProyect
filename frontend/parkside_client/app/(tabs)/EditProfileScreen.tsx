import React, { FC, useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import axios, { AxiosResponse } from 'axios';

interface EditProfileResponse {
    id: number;
    full_name: string;
    // Incluye otros campos de la respuesta del backend si es necesario
}

interface EditProfileScreenProps {
    navigation: any;
    route: any; // Para recibir los datos del perfil
}

const EditProfileScreen: FC<EditProfileScreenProps> = ({ navigation, route }) => {
    const [name, setName] = useState(route.params?.name || '');
    const [lastName, setLastName] = useState(route.params?.lastName || '');
    const documentType = route.params?.documentType || 'Passport';
    const documentNumber = route.params?.documentNumber || 'ABC-123456';
    const email = route.params?.email || 'user@example.com';
    const password = useState('');

    const [nameError, setNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const soloLetras = (texto: string): boolean => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);

    const handleNameChange = (text: string) => {
        setName(text);
        setNameError(!soloLetras(text) ? 'El nombre solo debe contener letras.' : null);
    };

    const handleLastNameChange = (text: string) => {
        setLastName(text);
        setLastNameError(!soloLetras(text) ? 'El apellido solo debe contener letras.' : null);
    };

    const handleSaveProfile = async () => {
        let isValid = true;

        if (!soloLetras(name)) {
            setNameError('El nombre solo debe contener letras.');
            isValid = false;
        } else {
            setNameError(null);
        }

        if (!soloLetras(lastName)) {
            setLastNameError('El apellido solo debe contener letras.');
            isValid = false;
        } else {
            setLastNameError(null);
        }

        if (isValid) {
            setLoading(true);
            setUpdateError(null);
            try {
                const fullName = `${name.trim()} ${lastName.trim()}`;
                const userData = {
                    id: route.params?.id || 0, // Asumiendo que 'id' se pasa en route.params
                    full_name: fullName,
                };

                const response: AxiosResponse<EditProfileResponse> = await axios.post(
                    'http://127.0.0.1:8000/api/v1/update-customer/',
                    userData
                );

                setLoading(false);
                console.log('Perfil actualizado:', response.data);
                Alert.alert('Perfil actualizado', 'Los cambios se han guardado correctamente.');
                navigation.goBack();
            } catch (error: any) {
                setLoading(false);
                console.error('Error al actualizar el perfil:', error.response?.data || error.message);
                setUpdateError(error.response?.data?.message || 'Error al actualizar el perfil. Por favor, intenta de nuevo.');
                Alert.alert('Error', error.response?.data?.message || 'No se pudo actualizar el perfil.');
            }
        }
    };

    const handleNonEditableChange = () => { };

    return (
        <ScreenLayout title="Perfil" navigation={navigation}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <View style={styles.formContainer}>
                    <ValidatedTextInput
                        label="Tipo de Documento"
                        value={documentType}
                        editable={false}
                        style={styles.disabledInput}
                        onChangeText={handleNonEditableChange}
                    />
                    <ValidatedTextInput
                        label="Número de Documento"
                        value={documentNumber}
                        editable={false}
                        style={styles.disabledInput}
                        keyboardType="number-pad"
                        onChangeText={handleNonEditableChange}
                    />
                    <ValidatedTextInput
                        label="Nombre"
                        value={name}
                        onChangeText={handleNameChange}
                        keyboardType="default"
                    />
                    {nameError && <Text style={styles.error}>{nameError}</Text>}

                    <ValidatedTextInput
                        label="Apellido"
                        value={lastName}
                        onChangeText={handleLastNameChange}
                        keyboardType="default"
                    />
                    {lastNameError && <Text style={styles.error}>{lastNameError}</Text>}

                    <ValidatedTextInput
                        label="Correo"
                        value={email}
                        editable={false}
                        keyboardType="email-address"
                        style={styles.disabledInput}
                        onChangeText={handleNonEditableChange}
                    />
                    <ValidatedTextInput
                        label="Contraseña"
                        value="••••••••"
                        secureTextEntry={true}
                        editable={false}
                        style={styles.disabledInput}
                        onChangeText={handleNonEditableChange}
                    />
                    {updateError && <Text style={styles.error}>{updateError}</Text>}

                    <TouchableOpacity style={styles.acceptButton} onPress={handleSaveProfile} disabled={loading}>
                        <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'ACEPTAR'}</Text>
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
    disabledInput: {
        backgroundColor: '#f0f0f0',
        color: 'gray',
    },
    acceptButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
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

export default EditProfileScreen;