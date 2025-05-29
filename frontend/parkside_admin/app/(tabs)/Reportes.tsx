import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import Dropdown from '../../components/common/Dropdown';
import RefreshButton from '../../components/common/RefreshButton';
import ReusableTable from '../../components/common/ReusableTable';

import { getReportePagos } from '@/api/reportePagosApi';
import { getReporteOcupacion } from '@/api/reporteOcupacionApi';
import {
  SearchPaymentReportRequest,
  SearchPaymentReport
} from '@/models/reportePagosModels';
import {
  SearchOccupationReportRequest,
  SearchOccupationReport
} from '@/models/reporteOcupacionModels';

const Reportes = () => {
  const [selectedReport, setSelectedReport] = useState('');
  const [searchText, setSearchText] = useState('');
  const [pagosData, setPagosData] = useState<SearchPaymentReport[]>([]);
  const [ocupacionData, setOcupacionData] = useState<SearchOccupationReport[]>([]);

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
    { label: 'Fecha Entrada', key: 'fechaEntrada' },
    { label: 'Hora Entrada', key: 'horaEntrada' },
    { label: 'Fecha Salida', key: 'fechaSalida' },
    { label: 'Hora Salida', key: 'horaSalida' },
  ];

  const handleRefresh = async () => {
    try {
      if (selectedReport === 'Reporte de pagos') {
        const request: SearchPaymentReportRequest = {
          employee_id: 1,
          customer_id: searchText ? parseInt(searchText) : 0,
        };
        const response = await getReportePagos(request);
        setPagosData(response.payment_report);
      } else if (selectedReport === 'Reporte de ocupación') {
        const request: SearchOccupationReportRequest = {
          employee_id: 1,
          plate: searchText,
        };
        const response = await getReporteOcupacion(request);
        setOcupacionData(response.occupation_report);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el reporte.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedReport) {
      handleRefresh();
    }
  }, [selectedReport]);

  // Transformar datos al formato esperado por la tabla
  const transformedPagosData = pagosData.map((item) => ({
    documento: item.customer_id.toString(),
    usuario: item.customer_full_name,
    fecha: item.date_created,
    monto: `$${item.transaction_amount.toLocaleString()}`,
    estado: item.status,
  }));

  const transformedOcupacionData = ocupacionData.map((item) => ({
    placa: item.plate,
    usuario: item.customer_full_name,
    fechaEntrada: item.entry_date,
    horaEntrada: item.entry_time,
    fechaSalida: item.exit_date ?? '',
    horaSalida: item.exit_time ?? '',
  }));

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
              onSubmitEditing={handleRefresh}
              style={styles.searchInput}
              keyboardType={selectedReport === 'Reporte de pagos' ? 'numeric' : 'default'}
            />
            <RefreshButton onPress={handleRefresh} />
          </View>
        )}

        {selectedReport === 'Reporte de pagos' && (
          <ReusableTable
            headers={pagosHeaders}
            data={filteredData(transformedPagosData, ['documento', 'usuario', 'fecha'])}
            noDataText="No hay reportes de pagos registrados."
          />
        )}

        {selectedReport === 'Reporte de ocupación' && (
          <ReusableTable
            headers={ocupacionHeaders}
            data={filteredData(transformedOcupacionData, ['placa', 'usuario', 'fechaEntrada'])}
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
