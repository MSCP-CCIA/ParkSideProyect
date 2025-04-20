import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import WebLayout from '../layouts/WebLayout';
import { router } from 'expo-router';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const validarCorreo = (correo: string): boolean => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(correo);
    };

    const handleAccept = () => {
        if (!email) {
            setEmailError('Por favor, introduce tu correo electrónico.');
        } else if (!validarCorreo(email)) {
            setEmailError('Correo electrónico inválido. Usa un formato válido.');
        } else {
            setEmailError(null);

            // Mostramos alerta de forma web-compatible
            if (Platform.OS === 'web') {
                window.alert('Revisa tu correo para restablecer tu contraseña.');
            }

            // Redirigir después de un pequeño retraso
            setTimeout(() => {
                router.replace('/(tabs)/Login');
            }, 100);
        }
    };

    const handleCancel = () => {
        router.replace('/(tabs)/Login');
    };

    return (
        <WebLayout>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>Recuperar Contraseña</Text>
                    <Text style={styles.description}>
                        Por favor, introduce tu correo electrónico para enviar un enlace de recuperación.
                    </Text>

                    <Text style={styles.label}>Correo electrónico</Text>
                    <TextInput
                        placeholder="example@email.com"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {emailError && <Text style={styles.error}>{emailError}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleAccept}>
                        <Text style={styles.buttonText}>Aceptar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </WebLayout>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDF0F4',
    },
    container: {
        width: '100%',
        maxWidth: 700,
        paddingHorizontal: 40,
        paddingVertical: 50,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#333',
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 25,
        color: '#555',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1076BE',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#1976D2',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default ChangePassword;
