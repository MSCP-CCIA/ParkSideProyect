import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Importar todas las imágenes
const iconUsuarios = require('../../assets/images/Usuarios.png');
const iconVehiculos = require('../../assets/images/issue-opened.png');
const iconReportes = require('../../assets/images/Reportes.png');
const iconRegistroEntrada = require('../../assets/images/RegistroEntrada.png');
const iconRegistroSalida = require('../../assets/images/RegistroSalida.png');
const iconParqueaderos = require('../../assets/images/estacionamiento.png');
const iconPerfil = require('../../assets/images/perfil.png');

const Sidebar = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.sidebar}>
            <Text style={styles.title}>Menú</Text>

            {/* Botones del menú */}
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Usuarios')}>
                <Image source={iconUsuarios} style={styles.icon} />
                <Text style={styles.text}>Usuarios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={iconVehiculos} style={styles.icon} />
                <Text style={styles.text}>Info Vehículos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={iconReportes} style={styles.icon} />
                <Text style={styles.text}>Reportes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={iconRegistroEntrada} style={styles.icon} />
                <Text style={styles.text}>Registro Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={iconRegistroSalida} style={styles.icon} />
                <Text style={styles.text}>Registro Salida</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={iconParqueaderos} style={styles.icon} />
                <Text style={styles.text}>Parqueaderos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditarPerfil')}>
                <Image source={iconPerfil} style={styles.icon} />
                <Text style={styles.text}>Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: 180,
        backgroundColor: '#AED1D8',
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 50,
    },
    icon: {
        width: 24,  // Ajustado para que todas se vean iguales
        height: 24,
        marginRight: 10,
        resizeMode: 'contain', // <-- Para que no se deformen ni se recorten
    },
    text: {
        fontSize: 14,
        color: 'black',
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#1976D2',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'stretch',
    },
    logoutText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Sidebar;
