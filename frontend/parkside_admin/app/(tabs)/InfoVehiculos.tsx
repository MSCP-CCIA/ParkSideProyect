import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import RefreshButton from '../../components/common/RefreshButton';

const headers = [
    { label: 'Número de Documento', key: 'numeroDocumento' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Tipo Vehículo', key: 'tipoVehiculo' },
    { label: 'Correo', key: 'correo' },
    { label: 'Placa', key: 'placa' },
];

const data = [
    { numeroDocumento: '1054785687', nombre: 'Juan Valdés', tipoVehiculo: 'Carro', correo: 'juan@gmail.com', placa: 'INL065' },
    { numeroDocumento: '518386954', nombre: 'Manuel Castro', tipoVehiculo: 'Moto', correo: 'manuC@outlook.com', placa: 'AGB56D' },
    { numeroDocumento: '1000041257', nombre: 'Andres Hurtado', tipoVehiculo: 'Carro', correo: 'andy@usa.edu.co', placa: 'KQZ459' },
    { numeroDocumento: '1054785687', nombre: 'Juan Valdés', tipoVehiculo: 'Moto', correo: 'juan@gmail.com', placa: 'EZP46E' },
];

const InfoVehiculos = () => {
    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Información vehículos</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento"
                        style={styles.searchInput}
                    />
                    <RefreshButton onPress={() => console.log('Refrescar datos')} />
                </View>

                <ReusableTable
                    headers={headers}
                    data={data}
                    noDataText="No hay información de vehículos."
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
        marginRight: 10,
        backgroundColor: '#fff',
    },
});

export default InfoVehiculos;
