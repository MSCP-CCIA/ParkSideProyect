import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


const Sidebar = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <View style={styles.sidebar}>
            <Text style={styles.title}>Menú</Text>

            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/images/Usuarios.png')} style={styles.icon} />
                <Text style={styles.text}>Usuarios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/images/issue-opened.png')} style={styles.icon} />
                <Text style={styles.text}>Info Vehículos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/images/Reportes.png')} style={styles.icon} />
                <Text style={styles.text}>Reportes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/images/RegistroEntrada.png')} style={styles.icon} />
                <Text style={styles.text}>Registro Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/images/RegistroSalida.png')} style={styles.icon} />
                <Text style={styles.text}>Registro Salida</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={styles.logout}>
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
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    text: {
        fontSize: 14,
    },
    logout: {
        marginTop: 20,
        backgroundColor: '#1976D2',
        padding: 10,
        borderRadius: 6,
    },
    logoutText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Sidebar;
