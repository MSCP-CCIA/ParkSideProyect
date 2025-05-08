import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const EditarPerfil = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const [tipoDocumento] = useState('Cédula de Ciudadanía');
    const [numeroDocumento] = useState('123456789');
    const [correo] = useState('admin@email.com');
    const [rol] = useState('Administrador');

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');

    const [forceValidate, setForceValidate] = useState(false);

    const soloLetras = (texto: string): boolean => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);

    const handleSave = () => {
        setForceValidate(true);

        if (!nombre || !apellido || !contraseña) {
            Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
            return;
        }

        if (!soloLetras(nombre) || !soloLetras(apellido)) {
            Alert.alert('Error', 'Nombre y Apellido solo deben contener letras.');
            return;
        }

        if (contraseña.length < 8) {
            Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        Alert.alert('Perfil actualizado', 'Los cambios se han guardado correctamente.');
        navigation.navigate('Usuarios');
    };

    const handleCancel = () => {
        navigation.navigate('Usuarios');
    };

    return (
        <DashboardLayout>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Campos no editables */}
                <ValidatedTextInput
                    label="Tipo de Documento"
                    value={tipoDocumento}
                    onChangeText={() => {}}
                    editable={false}
                    style={styles.disabledInput}
                />
                <ValidatedTextInput
                    label="Número de Documento"
                    value={numeroDocumento}
                    onChangeText={() => {}}
                    editable={false}
                    style={styles.disabledInput}
                />
                <ValidatedTextInput
                    label="Correo"
                    value={correo}
                    onChangeText={() => {}}
                    editable={false}
                    style={styles.disabledInput}
                />

                {/* Campos editables */}
                <ValidatedTextInput
                    label="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                    validationRules={{ required: true, pattern: /^[a-zA-Z\s]+$/ }}
                    forceValidate={forceValidate}
                />
                <ValidatedTextInput
                    label="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                    validationRules={{ required: true, pattern: /^[a-zA-Z\s]+$/ }}
                    forceValidate={forceValidate}
                />
                <ValidatedTextInput
                    label="Contraseña"
                    value={contraseña}
                    onChangeText={setContraseña}
                    secureTextEntry
                    validationRules={{ required: true, minLength: 8 }}
                    forceValidate={forceValidate}
                />

                {/* Botones */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.buttonText}>CANCELAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton} onPress={handleSave}>
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
    disabledInput: {
        backgroundColor: '#f0f0f0',
        color: 'gray',
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

export default EditarPerfil;
