import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';

const masIcono = require('../../assets/images/mas-icono.png');

const usuarios = [
    {
        documento: '1054785687',
        nombre: 'Juan Valdés',
        tipo: 'Cédula',
        correo: 'juan@gmail.com',
        rol: 'Usuario',
    },
    {
        documento: '518386954',
        nombre: 'Manuel Castro',
        tipo: 'Tarjeta Identidad',
        correo: 'manuC@outlook.com',
        rol: 'Empleado',
    },
    {
        documento: '1000041257',
        nombre: 'Andres Hurtado',
        tipo: 'Cédula Extranjera',
        correo: 'andy@usa.edu.co',
        rol: 'Administrador',
    },
];

const Usuarios = () => {
    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Usuarios</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento, Nombre, Correo, Rol"
                        style={styles.searchInput}
                    />
                    <TouchableOpacity style={styles.refreshButton}>
                        <Text style={styles.refreshButtonText}>REFRESCAR</Text>
                    </TouchableOpacity>
                </View>

                <ReusableTable
                    headers={['Número de Documento', 'Nombre', 'Tipo Documento', 'Correo', 'Rol']}
                    data={usuarios}
                    renderActions={(row, index) => (
                        <TouchableOpacity onPress={() => console.log('Abrir CRUD para', row.nombre)}>
                            <Image source={masIcono} style={styles.icon} />
                        </TouchableOpacity>
                    )}
                    noDataText="No hay usuarios registrados."
                />

                <TouchableOpacity style={styles.createButton}>
                    <Text style={styles.createButtonText}>Crear nuevo usuario</Text>
                </TouchableOpacity>
            </ScrollView>
        </DashboardLayout>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#1976D2',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    refreshButton: {
        backgroundColor: '#1976D2',
        paddingHorizontal: 20,
        marginLeft: 10,
        borderRadius: 8,
        justifyContent: 'center',
    },
    refreshButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    icon: {
        width: 20,
        height: 20,
    },
    createButton: {
        marginTop: 24,
        backgroundColor: '#1976D2',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Usuarios;
