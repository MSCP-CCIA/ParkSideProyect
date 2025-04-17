import React, {FC, useState} from 'react';
import {Alert, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';

interface EditProfileScreenProps {
    navigation: any;
    route: any; // To receive profile data
}

const EditProfileScreen: FC<EditProfileScreenProps> = ({navigation, route}) => {
    const [name, setName] = useState(route.params?.name || '');
    const [lastName, setLastName] = useState(route.params?.lastName || '');
    const documentType = route.params?.documentType || 'Passport';
    const documentNumber = route.params?.documentNumber || 'ABC-123456';
    const email = route.params?.email || 'user@example.com';
    const password = useState('');

    const [nameError, setNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);

    const soloLetras = (texto: string): boolean => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);

    const handleNameChange = (text: string) => {
        setName(text);
        setNameError(!soloLetras(text) ? 'El nombre solo debe contener letras.' : null);
    };

    const handleLastNameChange = (text: string) => {
        setLastName(text);
        setLastNameError(!soloLetras(text) ? 'El apellido solo debe contener letras.' : null);
    };

    const handleSaveProfile = () => {
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
            Alert.alert('Perfil actualizado', 'Los cambios se han guardado correctamente.');
            navigation.goBack();
        }
    };

    const handleNonEditableChange = () => {};

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

                    <TouchableOpacity style={styles.acceptButton} onPress={handleSaveProfile}>
                        <Text style={styles.buttonText}>ACEPTAR</Text>
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