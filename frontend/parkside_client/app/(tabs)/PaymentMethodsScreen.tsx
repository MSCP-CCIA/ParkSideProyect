import React, { FC, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScreenLayout from '../layouts/ScreenLayout';
import PaymentMethodItem from '../../components/cardValidation/PaymentMethodItemType';

import { listCards } from '../../api/listCardsApi';
import { SearchCard } from '../../models/card_models';
import {SearchCardsRequest, SearchCardsResponse} from '../../models/card_models'
import {SearchCardRequest} from '../../models/card_models'
import {SearchCardResponse} from '../../models/card_models'
interface PaymentMethodsScreenProps {
  navigation: any;
}

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard';
  last4: string;
}

const PaymentMethodsScreen: FC<PaymentMethodsScreenProps> = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const idString = await AsyncStorage.getItem('userId');
        const customer_id = idString ? parseInt(idString, 10) : null;

        if (!customer_id) {
          console.warn('No se encontró el ID del usuario');
          return;
        }
        const request: SearchCardsRequest = {
          customer_id: customer_id
        }
        const response = await listCards(request);

        const formattedCards: PaymentMethod[] = response.cards.map((card, index) => ({
          id: index.toString(),
          type: card.card_type === 'mastercard' ? 'mastercard' : 'visa',
          last4: card.last_four_digits.toString().padStart(4, '0'),

        }));

        setPaymentMethods(formattedCards);
      } catch (error) {
        console.error('Error al obtener tarjetas:', error);
      }
    };

    fetchCards();
  }, []);

  const handleCardPress = (item: PaymentMethod) => {

    navigation.navigate('CardDetailsScreen', { paymentMethod: item });
  };

  const handleAddPaymentMethod = () => {
    navigation.navigate('AddCard');
  };

  return (
    <ScreenLayout title="Métodos de Pago" navigation={navigation}>
      <View style={styles.container}>
        <FlatList
          data={paymentMethods}
          renderItem={({ item }) => (
            <PaymentMethodItem
              paymentMethod={item}
              onPress={() => handleCardPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
          <View>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No tienes tarjetas registradas.
            </Text>
          </View>
        }
        />

        <TouchableOpacity
          style={styles.addPaymentButton}
          onPress={handleAddPaymentMethod}
        >
          <Text style={styles.addPaymentButtonText}>Agregar método de pago</Text>
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
    backgroundColor: '#f0f8ff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  addPaymentButton: {
    backgroundColor: '#1976D2',
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
