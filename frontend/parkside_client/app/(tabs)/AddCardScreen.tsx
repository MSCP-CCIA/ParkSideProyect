// components/screens/AgregarTarjetaScreen.tsx
 import React, { FC, useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
 import ScreenLayout from '../layouts/ScreenLayout';
 import ValidatedTextInput from '../../components/cardValidation/ValidatedTextInput';
 import CardLogo from '../../components/cardValidation/CardLogo';

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

   const validateForm = () => {
     const newErrors: typeof errors = {};
     let isValid = true;

     if (!cardNumber.trim()) {
       newErrors.cardNumber = 'Card Number is required.';
       isValid = false;
     } else if (!/^\d{13,19}$/.test(cardNumber)) {
       newErrors.cardNumber = 'Invalid Card Number.';
       isValid = false;
     }

     if (!expiryDate.trim()) {
       newErrors.expiryDate = 'Expiry Date is required.';
       isValid = false;
     } else if (!/^(0[1-9]|1[0-2])\/([2-9][0-9])$/.test(expiryDate)) {
       newErrors.expiryDate = 'Invalid date format (MM/YY).';
       isValid = false;
     }

     if (!cvv.trim()) {
       newErrors.cvv = 'CVV is required.';
       isValid = false;
     } else if (!/^\d{3,4}$/.test(cvv)) {
       newErrors.cvv = 'Invalid CVV.';
       isValid = false;
     }

     if (!cardHolderName.trim()) {
       newErrors.cardHolderName = 'Cardholder Name is required.';
       isValid = false;
     }

     setErrors(newErrors);
     return isValid;
   };

   const handleAddCard = () => {
     if (validateForm()) {
       // Aquí iría la lógica para guardar la tarjeta
       console.log('Tarjeta agregada:', { cardNumber, expiryDate, cvv, cardHolderName });
       // Navegar a otra pantalla si es necesario
     } else {
       console.log('Validación del formulario fallida.');
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
             onChangeText={setCardNumber}
             validationRules={{
               required: true,
               pattern: /^\d{13,19}$/,
             }}
             style={styles.inputField} // Aplica estilo al input
           />

         </View>
      <View style={styles.cardLogoContainerBelow}> {/* Contenedor para el logo debajo */}
          <CardLogo cardNumber={cardNumber} />
      </View>
         {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}
         <ValidatedTextInput
           label="Titular de la tarjeta"
           placeholder="Nombre Titular"
           value={cardHolderName}
           onChangeText={setCardHolderName}
           validationRules={{ required: true }}
           style={styles.inputField} // Aplica estilo al input
         />
         {errors.cardHolderName && <Text style={styles.error}>{errors.cardHolderName}</Text>}
         <View style={styles.inputRow}>
           <ValidatedTextInput
             label="Fecha de vencimiento"
             placeholder="MM/YY"
             keyboardType="number-pad"
             value={expiryDate}
             onChangeText={setExpiryDate}
             validationRules={{
               required: true,
               pattern: /^(0[1-9]|1[0-2])\/([2-9][0-9])$/,
             }}
             style={[styles.inputField, styles.halfWidth, styles.marginRight]} // Estilos para la mitad de ancho
           />

           </View>
           <View style={styles.inputRow}>
           <ValidatedTextInput
             label="CVV"
             placeholder="_ _ _"
             keyboardType="number-pad"
             secureTextEntry={true}
             value={cvv}
             onChangeText={setCvv}
             validationRules={{
               required: true,
               pattern: /^\d{3,4}$/,
             }}
             style={[styles.inputField, styles.halfWidth]} // Estilos para la mitad de ancho
           />
         </View>
         {errors.expiryDate && <Text style={styles.error}>{errors.expiryDate}</Text>}
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
   title: {
     fontSize: 20,
     fontWeight: 'bold',
     color: 'black',
     marginBottom: 30,
     textAlign: 'center',
   },
   inputGroup: {
     width: '100%',
     marginBottom: 15,
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
   cardLogoContainer: {
     marginLeft: 30,
   },
   cardLogoContainerBelow: {
     alignSelf: 'flex-start',
     // marginTop: 5, // Elimina el margen superior
   },
   halfWidth: {
     flex: 0.5,
   },
   marginRight: {
     marginRight: 10,
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