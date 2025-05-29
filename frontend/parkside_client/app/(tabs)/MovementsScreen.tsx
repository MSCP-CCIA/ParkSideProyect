import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import TableItem from '../../components/common/TableItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { paymentsHistory } from '../../api/paymentsHistoryApi';
import { SearchMovementsHistoryResponse, SearchMovementsHistoryRequest } from '../../models/payments_models';

interface MovementsScreenProps {
  navigation: any;
}

interface Movement {
  [key: string]: string;
  Fecha: string;
  Placa: string;
  Pagos: string;
}


const MovementsScreen: FC<MovementsScreenProps> = ({ navigation }) => {
  const [movementsData, setMovementsData] = useState<Movement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const columnFlexValues = {
    Fecha: 3,
    Placa: 3,
    Pagos: 2,
  };

  const columnStylesValues = {
    Pagos: { textAlign: 'right' as 'right' },
    Placa: { textAlign: 'center' as 'center' },
  };

  useEffect(() => {
    const fetchMovements = async () => {
      setLoading(true);
      try {
        const idString = await AsyncStorage.getItem('userId');
        if (!idString) {
          Alert.alert('Error', 'No se encontró la información del usuario.');
          setLoading(false);
          return;
        }
        const customerId = parseInt(idString, 10);
        const requestData: SearchMovementsHistoryRequest = { customer_id: customerId };

        const response: SearchMovementsHistoryResponse = await paymentsHistory(requestData);

        const formattedMovements: Movement[] = response.movements.map((mov) => ({
          Fecha: mov.date_approved,
          Placa: mov.plate,
          Pagos: `${mov.payment.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`,
        }));

        setMovementsData(formattedMovements);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar movimientos:', error);
        Alert.alert('Error', 'No se pudo cargar el historial de movimientos.');
        setLoading(false);
      }
    };

    fetchMovements();
  }, []);

  return (
    <ScreenLayout title="Movimientos" navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Historial de Parqueos</Text>

        <View style={styles.listHeader}>
          <Text style={[styles.headerColumn, { flex: columnFlexValues.Fecha }]}>Fecha</Text>
          <Text style={[styles.headerColumn, { flex: columnFlexValues.Placa }, columnStylesValues.Placa]}>Placa</Text>
          <Text style={[styles.headerColumn, { flex: columnFlexValues.Pagos }, columnStylesValues.Pagos]}>Pagos</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#1976D2" />
        ) : (
          <FlatList
            data={movementsData}
            renderItem={({ item, index }) => (
              <TableItem
                itemData={item}
                columnFlex={columnFlexValues}
                columnStyles={columnStylesValues}
                index={index}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={<Text>No hay movimientos para mostrar.</Text>}
          />
        )}
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f0f8ff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
  },
  listHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerColumn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default MovementsScreen;
