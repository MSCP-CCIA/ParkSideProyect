import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardLogo from './CardLogoType';

interface PaymentMethodItemProps {
  paymentMethod: {
    type: 'visa' | 'mastercard';
    last4: string;
  };
  onPress: () => void;
}

const PaymentMethodItem: FC<PaymentMethodItemProps> = ({ paymentMethod, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CardLogo cardType={paymentMethod.type} /><Text style={styles.cardNumber}>****{paymentMethod.last4}</Text><View style={styles.arrowContainer}><Ionicons name="chevron-forward" size={24} color="gray" /></View>
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
  cardNumber: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    marginLeft: 15,
  },
  arrowContainer: {
    marginLeft: 10,
  },
});

export default PaymentMethodItem;
