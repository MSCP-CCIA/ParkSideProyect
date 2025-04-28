import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import RefreshButton from '../../components/common/RefreshButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ReusableTable from '../../components/common/ReusableTable';
import { TouchableOpacity } from 'react-native';

const Tarifas = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const headers = [
        { label: 'Precio Carro', key: 'precioCarro' },
        { label: 'Precio Moto', key: 'precioMoto' },
        { label: 'Fecha Inicio', key: 'fechaInicio' },
        { label: 'Fecha Fin', key: 'fechaFin' },
    ];

    const tarifas = [
        { precioCarro: '12.000 $', precioMoto: '10.000 $', fechaInicio: '23/03/2025', fechaFin: '31/03/2025' },
        { precioCarro: '10.000 $', precioMoto: '8.000 $', fechaInicio: '01/04/2025', fechaFin: '15/04/2025' },
        { precioCarro: '12.000 $', precioMoto: '10.000 $', fechaInicio: '20/04/2025', fechaFin: '02/04/2025' },
    ];

    const handleCreateTarifa = () => {
        navigation.navigate('CrearTarifas');
    };

    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Tarifas</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Fecha de inicio o Fecha Fin"
                        style={styles.searchInput}
                    />
                    <RefreshButton onPress={() => console.log('Refrescar tarifas')} />
                </View>

                <ReusableTable
                    headers={headers}
                    data={tarifas}
                    noDataText="No hay tarifas registradas."
                />

                <TouchableOpacity style={styles.createButton} onPress={handleCreateTarifa}>
                    <Text style={styles.createButtonText}>Crear nueva Tarifa</Text>
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
        marginRight: 10,
        backgroundColor: '#fff',
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

export default Tarifas;
