import React, { FC } from 'react';
 import { View, Text, StyleSheet, FlatList } from 'react-native';
 import ScreenLayout from '../layouts/ScreenLayout';
 import TableItem from '../../components/common/TableItem'; // Updated import

 interface MovementsScreenProps {
   navigation: any;
 }

 interface Movement {
   [key: string]: string; // Add the index signature
   Fecha: string;
   Placa: string;
   Pagos: string;
 }

 const MovementsScreen: FC<MovementsScreenProps> = ({ navigation }) => {
   const movementsData: Movement[] = [
     { Fecha: '7/01/2025', Placa: 'INL34H', Pagos: '-15.000 $' },
     { Fecha: '14/02/2025', Placa: 'INL34H', Pagos: '-15.000 $' },
     { Fecha: '23/01/2025', Placa: 'CQV532', Pagos: '-15.000 $' },
     // ... other data
   ];

   const columnFlexValues = {
     Fecha: 2,
     Placa: 2,
     Pagos: 3,
   };

   const columnStylesValues = {
     Pagos: { textAlign: 'right' as 'right' },
   };

   return (
     <ScreenLayout title="Movimientos" navigation={navigation}>
       <View style={styles.container}>
         <Text style={styles.headerText}>Historial de Parqueos</Text>
         <View style={styles.listHeader}>
           <Text style={[styles.headerColumn, { flex: columnFlexValues.Fecha }]}>Fecha</Text>
           <Text style={[styles.headerColumn, { flex: columnFlexValues.Placa }]}>Placa</Text>
           <Text style={[styles.headerColumn, { flex: columnFlexValues.Pagos }, columnStylesValues.Pagos]}>Pagos</Text>
         </View>
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
           keyExtractor={(item, index) => index.toString()}
         />
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