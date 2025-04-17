import React, { FC } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import PaymentMethodItem from '../../components/cardValidation/PaymentMethodItem';

 interface PaymentMethodsScreenProps {
   navigation: any;
 }

 interface PaymentMethod {
   id: string;
   type: 'visa' | 'mastercard';
   last4: string;
   number: string; // Añadimos el número de tarjeta completo
 }

 const PaymentMethodsScreen: FC<PaymentMethodsScreenProps> = ({ navigation }) => {
   // Datos de ejemplo de métodos de pago guardados
   const paymentMethods: PaymentMethod[] = [
     { id: '1', type: 'mastercard', last4: '9306', number: '5123456789019306' },
     { id: '2', type: 'visa', last4: '8584', number: '4500123456788584' },
     { id: '3', type: 'visa', last4: '2211', number: '4111111111112211' },
     { id: '4', type: 'mastercard', last4: '7890', number: '5555555555557890' },
     // Puedes añadir más métodos de pago aquí
   ];

   // Función que se ejecuta cuando se toca una tarjeta
   const handleCardPress = (item: PaymentMethod) => {
     console.log('Tarjeta Tocada:', item);
     // Navega a la pantalla de detalles de la tarjeta, pasando la información
     navigation.navigate('CardDetailsScreen', { paymentMethod: item });
   };

   // Función para navegar a la pantalla de agregar una nueva tarjeta
   const handleAddPaymentMethod = () => {
     console.log('Botón de Agregar Método de Pago Tocado');
     navigation.navigate('AddCard');
   };

   return (
     <ScreenLayout title="Metodos de Pago" navigation={navigation}>
       <View style={styles.container}>
         <FlatList
           data={paymentMethods}
           renderItem={({ item }) => (
             <PaymentMethodItem paymentMethod={item} onPress={() => handleCardPress(item)} />
           )}
           keyExtractor={(item) => item.id}
           ItemSeparatorComponent={() => <View style={styles.separator} />}
         />
         <TouchableOpacity style={styles.addPaymentButton} onPress={handleAddPaymentMethod}>
           <Text style={styles.addPaymentButtonText}>Agregar metodo de pago</Text>
         </TouchableOpacity>
       </View>
     </ScreenLayout>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingHorizontal: 20,
     paddingTop: 20,
     backgroundColor: '#f0f8ff', // Fondo azul claro
   },
   separator: {
     height: 1,
     backgroundColor: '#ccc',
     marginVertical: 10,
   },
   addPaymentButton: {
     backgroundColor: '#1976D2', // Botón azul
     borderRadius: 25,
     paddingVertical: 15,
     alignItems: 'center',
     marginTop: 20,
   },
   addPaymentButtonText: {
     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
   },
 });

 export default PaymentMethodsScreen;