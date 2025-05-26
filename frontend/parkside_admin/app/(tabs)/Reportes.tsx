import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import Dropdown from '../../components/common/Dropdown';
import RefreshButton from '../../components/common/RefreshButton';
import ReusableTable from '../../components/common/ReusableTable';

const Reportes = () => {
    const [selectedReport, setSelectedReport] = useState('');
    const [searchText, setSearchText] = useState('');

    const reportOptions = ['Reporte de pagos', 'Reporte de ocupación'];

    const pagosHeaders = [
        { label: 'Número de Documento', key: 'documento' },
        { label: 'Usuario', key: 'usuario' },
        { label: 'Fecha', key: 'fecha' },
        { label: 'Monto', key: 'monto' },
        { label: 'Estado', key: 'estado' },
    ];

    const ocupacionHeaders = [
        { label: 'Placa del Vehículo', key: 'placa' },
        { label: 'Usuario', key: 'usuario' },
        { label: 'FechaEntrada', key: 'fechaEntrada' },
        { label: 'FechaSalida', key: 'fechaSalida' },
        { label: 'HoraEntrada', key: 'horaEntrada' },
        { label: 'HoraSalida', key: 'horaSalida' },
    ];

    const pagosData = [
        { documento: '1054785687', usuario: 'Juan Valdés', fecha: '7/02/2025', monto: '15.000 $', estado: 'Completado' },
        { documento: '518386954', usuario: 'Manuel Castro', fecha: '4/03/2025', monto: '0$', estado: 'Pendiente' },
        { documento: '1000041257', usuario: 'Andres Hurtado', fecha: '18/03/2025', monto: '0$', estado: 'Rechazado' },
    ];

    const ocupacionData = [
        { placa: 'INL073', usuario: 'Juan Valdés', fechaEntrada: '7/02/2025', horaEntrada: '7:26 AM', fechaSalida: '7/02/2025',  horaSalida: '2:22 PM' },
        { placa: 'ABC85D', usuario: 'Manuel Castro', fechaEntrada: '4/03/2025', horaEntrada: '10:15 PM', fechaSalida: '5/03/2025',  horaSalida: '6:16 AM' },
        { placa: 'KQZ65E', usuario: 'Andres Hurtado', fechaEntrada: '18/03/2025', horaEntrada: '9:42 AM', fechaSalida: '18/03/2025',  horaSalida: '8:40 AM' },
    ];

    const handleRefresh = () => {
        console.log('Refrescando reportes...');
    };

    const filteredData = (data: any[], searchFields: string[]) => {
        const text = searchText.toLowerCase();
        return data.filter(item =>
            searchFields.some(field => item[field]?.toLowerCase().includes(text))
        );
    };

    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Movimientos</Text>

                <Dropdown
                    label=""
                    value={selectedReport}
                    items={reportOptions}
                    onValueChange={setSelectedReport}
                />

                {selectedReport && (
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder={
                                selectedReport === 'Reporte de pagos'
                                    ? 'Buscar por Número de Documento'
                                    : 'Buscar por Placa del Vehículo'
                            }
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.searchInput}
                        />
                        <RefreshButton onPress={handleRefresh} />
                    </View>
                )}

                {selectedReport === 'Reporte de pagos' && (
                    <ReusableTable
                        headers={pagosHeaders}
                        data={filteredData(pagosData, ['documento', 'usuario', 'fecha'])}
                        noDataText="No hay reportes de pagos registrados."
                    />
                )}

                {selectedReport === 'Reporte de ocupación' && (
                    <ReusableTable
                        headers={ocupacionHeaders}
                        data={filteredData(ocupacionData, ['placa', 'usuario', 'fecha'])}
                        noDataText="No hay reportes de ocupación registrados."
                    />
                )}
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
});

export default Reportes;
