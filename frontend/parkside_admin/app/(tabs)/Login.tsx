import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import WebLayout from '../layouts/WebLayout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            setEmailError('Correo electrónico inválido. Usa un formato válido.');
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
            Alert.alert('Inicio de sesión exitoso');
        } else {
            Alert.alert('Error', 'Por favor, corrige los errores en los campos.');
        }
    };

    return (
        <WebLayout>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/car_parking_icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Iniciar Sesión</Text>

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

                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        placeholder="Contraseña"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError && <Text style={styles.error}>{passwordError}</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </WebLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 1800, // <-- Cambiamos de 400 a 600
        alignSelf: 'center',
        marginTop: 50,
        paddingHorizontal: 250,
        paddingVertical: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },

    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
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
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        width: 400,
        alignSelf: 'center'
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginTop: -5,
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
    link: {
        color: '#1976D2',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
    },
});


export default Login;