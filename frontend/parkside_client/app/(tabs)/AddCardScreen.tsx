import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/cardValidation/ValidatedTextInput';
import CardLogo from '../../components/cardValidation/CardLogo';

interface AgregarTarjetaScreenProps {
    navigation: any;
}

const AgregarTarjetaScreen: FC<AgregarTarjetaScreenProps> = ({navigation}) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [errors, setErrors] = useState<{
        cardNumber?: string;
        expiryDate?: string;
        cvv?: string;
        cardHolderName?: string;
    }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};
        let isValid = true;

        if (!/^\d{15,19}$/.test(cardNumber)) {
            newErrors.cardNumber = 'El número debe tener entre 15 y 19 dígitos.';
            isValid = false;
        }

        if (!cardHolderName.trim()) {
            newErrors.cardHolderName = 'El titular es obligatorio.';
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(cardHolderName)) {
            newErrors.cardHolderName = 'Solo se permiten letras.';
            isValid = false;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            newErrors.expiryDate = 'Formato inválido. Usa MM/YY.';
            isValid = false;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'El CVC debe tener 3 o 4 dígitos.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCardNumberChange = (text: string) => {
        setCardNumber(text.replace(/[^0-9]/g, '').slice(0, 19));
    };

    const handleCardHolderChange = (text: string) => {
        setCardHolderName(text.replace(/[^a-zA-Z\s]/g, ''));
    };

    const handleExpiryChange = (text: string) => {
        let cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
        if (cleaned.length >= 3) {
            cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        setExpiryDate(cleaned);
    };

    const handleCvvChange = (text: string) => {
        setCvv(text.replace(/[^0-9]/g, '').slice(0, 4));
    };

    const handleAddCard = () => {
        if (validateForm()) {
            console.log('Tarjeta agregada:', {cardNumber, expiryDate, cvv, cardHolderName});
        } else {
            console.log('Validación fallida.');
        }
    };

    return (
        <ScreenLayout title="Método de pago" navigation={navigation}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <View style={styles.inputRow}>
                    <ValidatedTextInput
                        label="Número de la tarjeta"
                        placeholder="XXXXXXXXXXXXXXXX"
                        keyboardType="number-pad"
                        value={cardNumber}
                        onChangeText={handleCardNumberChange}
                        style={styles.inputField}
                    />
                </View>

                <View style={styles.cardLogoContainerBelow}>
                    <CardLogo cardNumber={cardNumber}/>
                </View>
                {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}

                <ValidatedTextInput
                    label="Titular de la tarjeta"
                    placeholder="Nombre Titular"
                    keyboardType="default"
                    value={cardHolderName}
                    onChangeText={handleCardHolderChange}
                    style={styles.inputField}
                />
                {errors.cardHolderName && <Text style={styles.error}>{errors.cardHolderName}</Text>}

                <ValidatedTextInput
                    label="Fecha de vencimiento"
                    placeholder="MM/YY"
                    keyboardType="number-pad"
                    value={expiryDate}
                    onChangeText={handleExpiryChange}
                    maxLength={5}
                    style={styles.inputField}
                />
                {errors.expiryDate && <Text style={styles.error}>{errors.expiryDate}</Text>}

                <ValidatedTextInput
                    label="CVC"
                    placeholder="***"
                    keyboardType="number-pad"
                    secureTextEntry={true}
                    value={cvv}
                    onChangeText={handleCvvChange}
                    style={styles.inputField}
                />
                {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleAddCard}>
                    <Text style={styles.buttonText}>SIGUIENTE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>CANCELAR</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        width: '100%',
    },
    inputField: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
        color: 'black',
    },
    cardLogoContainerBelow: {
        alignSelf: 'flex-start',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
    },
    cancelButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AgregarTarjetaScreen;
