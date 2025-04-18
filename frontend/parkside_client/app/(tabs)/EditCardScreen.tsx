import React, { FC, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import CardLogo from '../../components/cardValidation/CardLogo';

interface EditCardScreenProps {
    navigation: any;
    route: any;
}

const EditCardScreen: FC<EditCardScreenProps> = ({ navigation, route }) => {
    const { paymentMethod } = route.params;

    const [cardHolderName, setCardHolderName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const [errors, setErrors] = useState<{
        cardHolderName?: string;
        expiryDate?: string;
        cvv?: string;
    }>({});

    const handleCardHolderChange = (text: string) => {
        setCardHolderName(text.replace(/[^a-zA-Z\s]/g, ''));
        if (!/^[a-zA-Z\s]*$/.test(text)) {
            setErrors((prev) => ({
                ...prev,
                cardHolderName: 'Solo se permiten letras.',
            }));
        } else {
            setErrors((prev) => ({ ...prev, cardHolderName: undefined }));
        }
    };

    const handleExpiryChange = (text: string) => {
        let cleaned = text.replace(/[^0-9]/g, '').slice(0, 4);
        if (cleaned.length >= 3) {
            cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        setExpiryDate(cleaned);
        setErrors((prev) => ({ ...prev, expiryDate: undefined }));
    };

    const handleCvvChange = (text: string) => {
        setCvv(text.replace(/[^0-9]/g, '').slice(0, 4));
        setErrors((prev) => ({ ...prev, cvv: undefined }));
    };

    const validateForm = (): boolean => {
        let valid = true;
        const newErrors: typeof errors = {};

        if (!cardHolderName.trim()) {
            newErrors.cardHolderName = 'El titular es obligatorio.';
            valid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(cardHolderName)) {
            newErrors.cardHolderName = 'Solo se permiten letras.';
            valid = false;
        }

        if (!/^(0[1-9]|1[0-2])\/(2[5-9]|3[0-9]|40)$/.test(expiryDate)) {
            newErrors.expiryDate = 'Fecha inválida. Usa un mes entre 01 y 12 y un año entre 25 y 40 (MM/YY).';
            valid = false;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'El CVC debe tener 3 o 4 dígitos.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };


    const handleSaveChanges = () => {
        if (validateForm()) {
            Alert.alert('Cambios guardados', 'Tu tarjeta ha sido actualizada correctamente.');
            navigation.navigate('MainMenu');
        }
    };

    const handleCancel = () => {
        navigation.navigate('MainMenu');
    };

    return (
        <ScreenLayout title="Método de Pago" navigation={navigation}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <CardLogo cardNumber={paymentMethod.number} />
                <Text style={styles.cardNumber}>****{paymentMethod.last4}</Text>

                <ValidatedTextInput
                    label="Titular de la tarjeta"
                    placeholder="Tu Nombre"
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
                    style={styles.inputField}
                />
                {errors.expiryDate && <Text style={styles.error}>{errors.expiryDate}</Text>}

                <ValidatedTextInput
                    label="CVC"
                    placeholder="_ _ _"
                    keyboardType="number-pad"
                    value={cvv}
                    onChangeText={handleCvvChange}
                    style={styles.inputField}
                />
                {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.buttonText}>SIGUIENTE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.cancelButtonText}>CANCELAR</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        color: 'black',
    },
    inputField: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
        color: 'black',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#0288A8',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditCardScreen;
