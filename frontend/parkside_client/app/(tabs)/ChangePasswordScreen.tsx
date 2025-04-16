import React, { FC, useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
 import ScreenLayout from '../layouts/ScreenLayout';
 import ValidatedTextInput from '../../components/common/ValidatedTextInput';

 interface ChangePasswordScreenProps {
   navigation: any;
 }

 const ChangePasswordScreen: FC<ChangePasswordScreenProps> = ({ navigation }) => {
   const [email, setEmail] = useState('');

   const handleEmailChange = (text: string) => {
     setEmail(text);
     console.log('Entered Email:', text);
   };

   const handleAccept = () => {
     console.log('Accept Pressed for Password Change with Email:', email);
     // Logic to send password reset email (API call)
     // Navigate to a confirmation screen or display a message
   };

   return (
     <ScreenLayout title="Cambio de contraseña" navigation={navigation}>
       <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
       >
         <View style={styles.contentContainer}>
           <Text style={styles.instructionText}>Por favor ingrese su correo electrónico para cambiar su contraseña</Text>
           <ValidatedTextInput
             label="Correo"
             placeholder="example@email.com"
             keyboardType="email-address"
             value={email}
             onChangeText={handleEmailChange}
             validationRules={{
               required: true,
               pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
             }}
           />
           <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
             <Text style={styles.buttonText}>Aceptar</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
             <Text style={styles.buttonText}>Cancelar</Text>
           </TouchableOpacity>
         </View>
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
     backgroundColor: '#f0f8ff', // Light blue background (similar to image)
   },
   contentContainer: {
     width: '100%',
     marginTop: 40,
     alignItems: 'center',
   },
   instructionText: {
     fontSize: 18,
     color: 'black',
     textAlign: 'center',
     marginBottom: 30,
   },
   acceptButton: {
     backgroundColor: '#1976D2', // Example blue color
     paddingVertical: 15,
     borderRadius: 25,
     alignItems: 'center',
     marginTop: 30,
     width: '100%',
   },
   cancelButton: {
     backgroundColor: '#E0E0E0', // Example light gray color
     paddingVertical: 15,
     borderRadius: 25,
     alignItems: 'center',
     marginTop: 15,
     width: '100%',
   },
   buttonText: {
     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
   },
 });

 export default ChangePasswordScreen;