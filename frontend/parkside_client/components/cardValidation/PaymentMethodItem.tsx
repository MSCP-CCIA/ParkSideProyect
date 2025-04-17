import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import CardLogo from './CardLogo'; // Import your CardLogo component
 interface PaymentMethodItemProps {
   paymentMethod: {
     type: 'visa' | 'mastercard';
     last4: string;
     number?: string; // El número completo es opcional aquí
   };
   onPress: () => void;
 }

 const PaymentMethodItem: FC<PaymentMethodItemProps> = ({ paymentMethod, onPress }) => {
   return (
     <TouchableOpacity style={styles.container} onPress={onPress}>
       {paymentMethod.number ? (
         <CardLogo cardNumber={paymentMethod.number} />
       ) : (
         <View style={styles.placeholderLogo} /> // Muestra un espacio si no hay número completo
       )}
       <Text style={styles.cardNumber}>****{paymentMethod.last4}</Text>
       <View style={styles.arrowContainer}>
         <Ionicons name="chevron-forward" size={24} color="gray" />
       </View>
     </TouchableOpacity>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: 'white',
     borderRadius: 8,
     padding: 15,
   },
   placeholderLogo: {
     width: 50,
     height: 30,
     marginRight: 15,
   },
   cardNumber: {
     fontSize: 18,
     color: 'black',
     flex: 1,
     marginLeft: 15, // Espacio si no hay logo
   },
   arrowContainer: {
     marginLeft: 10,
   },
 });

 export default PaymentMethodItem;