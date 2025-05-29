import React, { FC, useEffect, useState } from 'react'; // Importa useEffect y useState
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; // Importa ActivityIndicator para carga
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para obtener el userId
import ScreenLayout from '../layouts/ScreenLayout';
import CardLogo from '../../components/cardValidation/CardLogoType';

// Importa las interfaces y la función de la API
import { SearchCardRequest, SearchCardResponse } from '../../models/card_models'; // Ajusta la ruta si es necesario
import { getCard } from '../../api/getCardApi'; // Ajusta la ruta si es necesario
import { deleteCard } from '../../api/deleteCardApi'; // Ajusta la ruta si es diferente
import { DeleteCardRequest } from '../../models/card_models';
interface CardDetailsScreenProps {
    navigation: any;
    route: any;
}

// Extiende la interfaz PaymentMethod si no la tenías en esta vista para incluir el tipo de tarjeta
// Si 'cardType' no viene en route.params.paymentMethod, la API lo devolverá.
interface RoutePaymentMethod {
  type: 'visa' | 'mastercard'; // Necesario para CardLogo
  last4: string;
  // Si paymentMethod tiene más propiedades iniciales, agrégalas aquí
}

const CardDetailsScreen: FC<CardDetailsScreenProps> = ({ navigation, route }) => {
    // Asegúrate de que paymentMethod que viene por ruta tenga 'last4' y 'type' para CardLogo
    const { paymentMethod }: { paymentMethod: RoutePaymentMethod } = route.params;

    // Estados para almacenar los datos de la API
    const [cardDetails, setCardDetails] = useState<SearchCardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCardDetails = async () => {
            try {
                setLoading(true); // Inicia la carga
                setError(null); // Resetea errores previos

                const idString = await AsyncStorage.getItem('userId');
                const customer_id = idString ? parseInt(idString, 10) : null;

                if (!customer_id) {
                    console.warn('No se encontró el ID del usuario para obtener detalles de la tarjeta');
                    setError('No se pudo cargar el ID de usuario.');
                    setLoading(false);
                    return;
                }
                console.log(parseInt(paymentMethod.last4))
                console.log(customer_id)
                const request: SearchCardRequest = {
                    last_four_digits: parseInt(paymentMethod.last4),
                    customer_id: customer_id,
                };
                console.log(request)

                const response = await getCard(request);
                setCardDetails(response); // Almacena la respuesta de la API
            } catch (err) {
                console.error('Error al obtener los detalles de la tarjeta:', err);
                setError('Error al cargar los detalles de la tarjeta.');
                Alert.alert('Error', 'No se pudieron cargar los detalles de la tarjeta. Por favor, inténtalo de nuevo.');
            } finally {
                setLoading(false); // Finaliza la carga
            }
        };

        fetchCardDetails();
    }, [paymentMethod.last4]); // Dependencia: re-ejecuta si cambian los últimos 4 dígitos

    const handleEdit = async () => { // Hacemos esta función async para obtener el userId
        try {
            const idString = await AsyncStorage.getItem('userId');
            const customer_id = idString ? parseInt(idString, 10) : null;

            if (!customer_id) {
                Alert.alert('Error', 'No se pudo obtener el ID del usuario para editar la tarjeta.');
                return;
            }

            const request: SearchCardRequest = {
                last_four_digits: parseInt(paymentMethod.last4, 10),
                customer_id: customer_id,
            };
            const response: SearchCardResponse = await getCard(request)
            navigation.navigate('EditCardScreen', { searchCardResponse: response });
        } catch (err) {
            console.error('Error al preparar la edición:', err);
            Alert.alert('Error', 'No se pudo preparar la edición de la tarjeta.');
        }
    };

    const handleDelete = async () => {
      try {
        const idString = await AsyncStorage.getItem('userId');
        const customer_id = idString ? parseInt(idString, 10) : null;

        if (!customer_id) {
          console.warn('No se pudo obtener el ID del usuario para eliminar la tarjeta.');
          return;
        }

        const request: DeleteCardRequest = {
          last_four_digits: parseInt(paymentMethod.last4, 10),
          customer_id: customer_id,
        };

        await deleteCard(request);

        // Redirige después de eliminar la tarjeta
        navigation.navigate('MainMenu');
      } catch (err) {
        console.error('Error al eliminar la tarjeta:', err);
      }
};

    if (loading) {
        return (
            <ScreenLayout title="Datos Tarjeta" navigation={navigation}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1976D2" />
                    <Text>Cargando detalles de la tarjeta...</Text>
                </View>
            </ScreenLayout>
        );
    }

    if (error) {
        return (
            <ScreenLayout title="Datos Tarjeta" navigation={navigation}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
                        <Text style={styles.retryButtonText}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </ScreenLayout>
        );
    }

    // Si cardDetails es null aquí, significa que algo salió mal después de la carga inicial
    // y no hubo un error capturado específicamente para mostrar un mensaje.
    // Esto podría ocurrir si la API devuelve null o un formato inesperado sin lanzar un error.
    if (!cardDetails) {
      return (
        <ScreenLayout title="Datos Tarjeta" navigation={navigation}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No se encontraron datos de la tarjeta.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </ScreenLayout>
      );
    }


    return (
        <ScreenLayout title="Datos Tarjeta" navigation={navigation}>
            <View style={styles.container}>
                {/* Asegúrate de que CardLogo puede recibir 'type' o 'cardNumber' según lo que use para mostrar el logo */}
                {/* Si 'type' viene en la respuesta de la API, podrías usar cardDetails.card_type */}
                <CardLogo cardType={paymentMethod.type} />
                <Text style={styles.cardNumber}>****{paymentMethod.last4}</Text>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Titular de la tarjeta</Text>
                    {/* Usa los datos de la API aquí */}
                    <Text style={styles.field}>{cardDetails.full_name_customer}</Text>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Fecha de vencimiento</Text>
                    {/* Usa los datos de la API aquí */}
                    <Text style={styles.field}>{cardDetails.expiration_date}</Text>
                </View>

                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.editButtonText}>EDITAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>ELIMINAR</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingTop: 30,
        alignItems: 'center',
    },
    cardNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 30,
        color: 'black',
    },
    fieldGroup: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        color: '#1976D2',
        fontWeight: 'bold',
        fontSize: 14,
    },
    field: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#e6f0ff',
        marginTop: 5,
    },
    editButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#0288A8',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
      backgroundColor: '#1976D2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    retryButtonText: {
      color: 'white',
      fontSize: 16,
    }
});

export default CardDetailsScreen;