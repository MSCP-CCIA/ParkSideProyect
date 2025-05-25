import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import RefreshButton from '../../components/common/RefreshButton';
import { SearchAllCustomerVehicles } from '../../Models/vehicleModels';
import { getAllCustomerVehicles } from '../../api/getAllCustomerVehicles';

const headers = [
    { label: 'Número de Documento', key: 'customer_id' },
    { label: 'Nombre', key: 'full_name' },
    { label: 'Tipo Vehículo', key: 'vehicle_type' },
    { label: 'Correo', key: 'email' },
    { label: 'Placa', key: 'plate' },
];

const InfoVehiculos = () => {
    const [vehicles, setVehicles] = useState<SearchAllCustomerVehicles[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const response = await getAllCustomerVehicles({
                employee_id: 1,
                customer_id: 1,
            });
            setVehicles(response.vehicles);
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            Alert.alert('Error', 'No se pudo obtener la información de los vehículos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const mappedData = vehicles.map((v) => ({
        numeroDocumento: String(v.customer_id),
        nombre: v.full_name,
        tipoVehiculo: v.vehicle_type,
        correo: v.email,
        placa: v.plate,
    }));


    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Información vehículos</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento"
                        style={styles.searchInput}
                    />
                    <RefreshButton onPress={fetchVehicles} />
                </View>

                <ReusableTable
                    headers={headers}
                    data={mappedData}
                    noDataText={loading ? 'Cargando información...' : 'No hay información de vehículos.'}
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
