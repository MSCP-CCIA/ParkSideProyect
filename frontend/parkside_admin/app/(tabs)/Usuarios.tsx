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
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import RefreshButton from '../../components/common/RefreshButton';

const headers = [
    { label: 'Número de Documento', key: 'numeroDocumento' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Tipo Documento', key: 'tipoDocumento' },
    { label: 'Correo', key: 'correo' },
    { label: 'Estado', key: 'estado' },
];

const usuarios = [
    {
        numeroDocumento: '1054785687',
        nombre: 'Juan Valdés',
        tipoDocumento: 'Cédula',
        correo: 'juan@gmail.com',
        estado: 'Activo',
    },
    {
        numeroDocumento: '518386954',
        nombre: 'Manuel Castro',
        tipoDocumento: 'Tarjeta Identidad',
        correo: 'manuC@outlook.com',
        estado: 'Activo',
    },
    {
        numeroDocumento: '1000041257',
        nombre: 'Andres Hurtado',
        tipoDocumento: 'Cédula Extranjera',
        correo: 'andy@usa.edu.co',
        estado: 'Inactivo',
    },
];

const Usuarios = () => {
    const handleToggleState = (nombre: string) => {
        Alert.alert(
            'Cambio de estado',
            `Se ha activado o desactivado el usuario ${nombre}.`,
            [{ text: 'Aceptar' }]
        );
    };

    const handleSearch = () => {
        console.log('Refrescando usuarios...');
    };

    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Usuarios</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento"
                        style={styles.searchInput}
                    />
                    <RefreshButton onPress={handleSearch} />
                </View>

                <ReusableTable
                    headers={headers}
                    data={usuarios}
                    renderActions={(row, index) => (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleToggleState(row.nombre)}
                        >
                            <Text style={styles.actionButtonText}>Activar / Desactivar</Text>
                        </TouchableOpacity>
                    )}
                    noDataText="No hay usuarios registrados."
                />
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
    actionButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Usuarios;
