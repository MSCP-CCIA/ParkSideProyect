import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import SelectableTable from '../../components/common/SelectableTable';
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

const RegistroEntrada = () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const handleSelectRow = (index: number) => {
        setSelectedRows((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Registro Entrada</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento, Nombre, Placa"
                        style={styles.searchInput}
                    />
                    <RefreshButton onPress={() => console.log('Refrescar datos')} />
                </View>

                <SelectableTable
                    headers={headers}
                    data={data}
                    selectedRows={selectedRows}
                    onSelectRow={handleSelectRow}
                />

                <TouchableOpacity
                    style={[styles.actionButton, selectedRows.length === 0 && styles.disabledButton]}
                    disabled={selectedRows.length === 0}
                    onPress={() => console.log('Liberar ingreso al parqueadero')}
                >
                    <Text style={styles.buttonText}>Liberar ingreso al parqueadero</Text>
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
    actionButton: {
        marginTop: 24,
        backgroundColor: '#1976D2',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0c4de',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RegistroEntrada;
