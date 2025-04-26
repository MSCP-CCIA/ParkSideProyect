import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import Dropdown from '../../components/common/Dropdown';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const CrearUsuario = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [forceValidate, setForceValidate] = useState(false);

    const documentTypes = ['Cédula de Ciudadanía', 'Pasaporte', 'Tarjeta de Identidad'];
    const roles = ['Administrador', 'Empleado', 'Usuario'];

    const validarCorreo = (correo: string): boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(correo);
    };

    const soloLetras = (texto: string): boolean => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);
    const soloNumeros = (texto: string): boolean => /^\d+$/.test(texto);

    const handleCreate = () => {
        setForceValidate(true);

        if (!documentType || !documentNumber || !name || !lastName || !email || !password || !role) {
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return;
        }

        Alert.alert('Éxito', 'Usuario ha sido creado.');
        navigation.navigate('Usuarios');
    };

    const handleCancel = () => {
        navigation.navigate('Usuarios');
    };

    return (
        <DashboardLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Dropdown
                    label="Tipo de Documento"
                    value={documentType}
                    items={documentTypes}
                    onValueChange={setDocumentType}
                />
                <ValidatedTextInput
                    label="Número de Documento"
                    value={documentNumber}
                    onChangeText={(text) => setDocumentNumber(text.replace(/[^0-9]/g, ''))}
                    keyboardType="number-pad"
                    validationRules={{ required: true }}
                    forceValidate={forceValidate}
                />
                <ValidatedTextInput
                    label="Nombre"
                    value={name}
                    onChangeText={setName}
                    validationRules={{ required: true, pattern: /^[a-zA-Z\s]+$/ }}
                    forceValidate={forceValidate}
                />
                <ValidatedTextInput
                    label="Apellido"
                    value={lastName}
                    onChangeText={setLastName}
                    validationRules={{ required: true, pattern: /^[a-zA-Z\s]+$/ }}
                    forceValidate={forceValidate}
                />
                <ValidatedTextInput
                    label="Correo"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    validationRules={{ required: true, custom: (val) => validarCorreo(val) ? null : 'Correo inválido' }}
                    forceValidate={forceValidate}
                />
                <ValidatedTextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    validationRules={{ required: true, minLength: 8 }}
                    forceValidate={forceValidate}
                />
                <Dropdown
                    label="Rol"
                    value={role}
                    items={roles}
                    onValueChange={setRole}
                />

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.buttonText}>CANCELAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton} onPress={handleCreate}>
                        <Text style={styles.buttonText}>ACEPTAR</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#178591',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    acceptButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CrearUsuario;
