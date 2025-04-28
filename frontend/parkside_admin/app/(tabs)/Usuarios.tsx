import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import FloatingActionsButton from '../../components/Button +/FloatingActionsButton';
import RefreshButton from '../../components/common/RefreshButton'; // 🔵 Agregado

const headers = [
    { label: 'Número de Documento', key: 'numeroDocumento' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Tipo Documento', key: 'tipoDocumento' },
    { label: 'Correo', key: 'correo' },
    { label: 'Rol', key: 'rol' },
];

const usuarios = [
    {
        numeroDocumento: '1054785687',
        nombre: 'Juan Valdés',
        tipoDocumento: 'Cédula',
        correo: 'juan@gmail.com',
        rol: 'Usuario',
    },
    {
        numeroDocumento: '518386954',
        nombre: 'Manuel Castro',
        tipoDocumento: 'Tarjeta Identidad',
        correo: 'manuC@outlook.com',
        rol: 'Empleado',
    },
    {
        numeroDocumento: '1000041257',
        nombre: 'Andres Hurtado',
        tipoDocumento: 'Cédula Extranjera',
        correo: 'andy@usa.edu.co',
        rol: 'Administrador',
    },
];

const Usuarios = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleCreateUser = () => {
        navigation.navigate('CrearUsuario');
    };

    const handleBlock = (nombre: string) => {
        Alert.alert(
            'Usuario bloqueado',
            `El usuario ${nombre} ha sido bloqueado correctamente.`,
            [{ text: 'Aceptar' }]
        );
    };

    const handleDeactivate = (nombre: string) => {
        Alert.alert(
            'Usuario desactivado',
            `El usuario ${nombre} ha sido desactivado correctamente.`,
            [{ text: 'Aceptar' }]
        );
    };

    const handleRefresh = () => {
        console.log('Refrescando usuarios...');
    };

    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Usuarios</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento, Nombre, Correo, Rol"
                        style={styles.searchInput}
                    />
                    <RefreshButton onPress={handleRefresh} />
                </View>

                <ReusableTable
                    headers={headers}
                    data={usuarios}
                    renderActions={(row, index) => (
                        <FloatingActionsButton
                            onBlock={() => handleBlock(row.nombre)}
                            onDeactivate={() => handleDeactivate(row.nombre)}
                        />
                    )}
                    noDataText="No hay usuarios registrados."
                />

                <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
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
        marginRight: 10,
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
