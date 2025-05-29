import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import ValidatedTextInput from '../../components/common/ValidatedTextInput';
import CardLogo from '../../components/cardValidation/CardLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateCardRequest} from '../../models/card_models'
import {Message} from '../../models/message_models'
import {addCard} from '../../api/addCardApi'
// API Service
interface SaveCardRequest {
    card_number: number;
    full_name_customer: string;
    month: number;
    year: number;
    cvc: number;
    card_type: string;
    customer_id: number;
}


interface AgregarTarjetaScreenProps {
    navigation: any;
}

const AgregarTarjetaScreen: FC<AgregarTarjetaScreenProps> = ({ navigation }) => {
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
    const [loading, setLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false); // Nuevo estado para éxito
    const [customerId, setCustomerId] = useState<number | null>(null);

    useEffect(() => {
        const getCustomerIdFromStorage = async () => {
            try {
                const storedData = await AsyncStorage.getItem('authToken');
                if (storedData) {
                    const idString = await AsyncStorage.getItem('userId');
                    const id = idString ? parseInt(idString, 10) : null;
                    setCustomerId(id);
                } else {
                    // Manejar el caso en que no hay datos de inicio de sesión
                    Alert.alert('Error', 'No se ha iniciado sesión. Por favor, inicie sesión.');
                    navigation.navigate('Login'); // Redirigir a la pantalla de inicio de sesión
                }
            } catch (error) {
                Alert.alert('Error', 'No se pudo obtener la información del usuario.');
                navigation.navigate('Login');
            }
        };
        getCustomerIdFromStorage();
    }, [navigation]);

    const getCardType = (number: string): string => {
        if (/^4/.test(number)) {
            return 'visa';
        } else if (/^5[1-5]/.test(number)) {
            return 'mastercard';
        }
        return '';
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};
        let isValid = true;
        if (!/^\d{16}$/.test(cardNumber)) {
            newErrors.cardNumber = 'El número debe tener exactamente 16 dígitos.';
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
        } else {
            const [monthStr, yearStr] = expiryDate.split('/');
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10) + 2000;

            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;

            if (year < currentYear || (year === currentYear && month < currentMonth) || year > currentYear + 15) {
                newErrors.expiryDate = 'Fecha de vencimiento inválida.';
                isValid = false;
            } else if (month < 1 || month > 12) {
                newErrors.expiryDate = 'Mes inválido (01-12).';
                isValid = false;
            } else if (year < 2025 || year > 2040) {
                newErrors.expiryDate = 'Año fuera de rango permitido (25-40).';
                isValid = false;
            }
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            newErrors.cvv = 'El CVC debe tener 3 o 4 dígitos.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCardNumberChange = (text: string) => {
        setCardNumber(text.replace(/[^0-9]/g, '').slice(0, 16));
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

    const handleAddCard = async () => {
        if (validateForm() && customerId !== null) {
            setLoading(true);
            setSaveError(null);
            setSaveSuccess(false); // Reset success state
            try {
                const [monthStr, yearShortStr] = expiryDate.split('/');
                const month = parseInt(monthStr, 10);
                const year = parseInt(yearShortStr, 10);
                const cardNumberNumber = parseInt(cardNumber, 10);
                const cvvNumber = parseInt(cvv, 10);

                const request: CreateCardRequest = {
                    card_number: cardNumberNumber,
                    full_name_customer: cardHolderName,
                    month: month,
                    year: year,
                    cvc: cvvNumber,
                    card_type: getCardType(cardNumber),
                    customer_id: customerId,
                }
                const reponse = await addCard(request)
                setLoading(false);
                setSaveSuccess(true);
                navigation.navigate('MainMenu');
            } catch (error: any) {
                setLoading(false);
                setSaveError('Error al guardar la tarjeta. Por favor, intenta de nuevo.');
                setSaveSuccess(false);
            }
        } else if (customerId === null) {
            Alert.alert('Advertencia', 'No se ha podido obtener la información del usuario. Por favor, inicie sesión nuevamente.');
            navigation.navigate('Login');
        } else {
        }
    };

    return (
        <ScreenLayout title="Agregar Tarjeta" navigation={navigation}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            >
                <View style={styles.inputRow}>
                    <ValidatedTextInput
                        label="Número"
                        placeholder="XXXXXXXXXXXXXXXX"
                        keyboardType="number-pad"
                        value={cardNumber}
                        onChangeText={handleCardNumberChange}
                        style={styles.inputField}
                    />
                </View>

                <View style={styles.cardLogoContainerBelow}>
                    <CardLogo cardNumber={cardNumber} />
                </View>
                {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}

                <ValidatedTextInput
                    label="Titular"
                    placeholder="Nombre Titular"
                    keyboardType="default"
                    value={cardHolderName}
                    onChangeText={handleCardHolderChange}
                    style={styles.inputField}
                />
                {errors.cardHolderName && <Text style={styles.error}>{errors.cardHolderName}</Text>}

                <ValidatedTextInput
                    label="Fecha de Vencimiento"
                    placeholder="MM/YY"
                    keyboardType="number-pad"
                    value={expiryDate}
                    onChangeText={handleExpiryChange}
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

                {saveError && <Text style={styles.error}>{saveError}</Text>}
                {saveSuccess && <Text style={styles.success}>Tarjeta guardada correctamente.</Text>}

                <TouchableOpacity style={styles.button} onPress={handleAddCard} disabled={loading || customerId === null}>
                    <Text style={styles.buttonText}>{loading ? 'Guardando...' : 'SIGUIENTE'}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()} disabled={loading}>
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
    success: {
        color: 'green',
        fontSize: 16,
        marginTop: 10,
        alignSelf: 'center',
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