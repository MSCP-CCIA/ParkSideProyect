import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import CardLogo from '../../components/cardValidation/CardLogo';

interface CardDetailsScreenProps {
    navigation: any;
    route: any;
}

const CardDetailsScreen: FC<CardDetailsScreenProps> = ({ navigation, route }) => {
    const { paymentMethod } = route.params;

    const handleEdit = () => {
        navigation.navigate('EditCardScreen', { paymentMethod });
    };

    const handleDelete = () => {
        Alert.alert(
            'Eliminar Método de Pago',
            '¿Estás seguro de que deseas eliminar este método de pago?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sí, eliminar',
                    style: 'destructive',
                    onPress: () => {
                        Alert.alert('Método de pago eliminado');
                        navigation.navigate('PaymentMethods');
                    },
                },
            ]
        );
    };

    return (
        <ScreenLayout title="Datos Tarjeta" navigation={navigation}>
            <View style={styles.container}>
                <CardLogo cardNumber={paymentMethod.number} />
                <Text style={styles.cardNumber}>****{paymentMethod.last4}</Text>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Titular de la tarjeta</Text>
                    <Text style={styles.field}>Juan Valdés</Text>
                </View>

                <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Fecha de vencimiento</Text>
                    <Text style={styles.field}>09/2027</Text>
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
});

export default CardDetailsScreen;