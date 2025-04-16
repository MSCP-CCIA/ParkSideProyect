import React, { FC, useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
 import ScreenLayout from '../layouts/ScreenLayout';
 import ValidatedTextInput from '../../components/common/ValidatedTextInput';

 interface EditProfileScreenProps {
   navigation: any;
   route: any; // To receive profile data
 }

 const EditProfileScreen: FC<EditProfileScreenProps> = ({ navigation, route }) => {
   const [name, setName] = useState(route.params?.name || '');
   const [lastName, setLastName] = useState(route.params?.lastName || '');
   const documentType = route.params?.documentType || 'Passport';
   const documentNumber = route.params?.documentNumber || 'ABC-123456';
   const email = route.params?.email || 'user@example.com';
   const password = useState('');

   const handleNameChange = (text: string) => {
     setName(text);
   };

   const handleLastNameChange = (text: string) => {
     setLastName(text);
   };

   // Función vacía para los campos no editables
   const handleNonEditableChange = (text: string) => {
     // No hacer nada
   };

   const handleSaveProfile = () => {
     console.log('Saving Profile:', { name, lastName });
     // Save logic
   };

   return (
     <ScreenLayout title="Perfil" navigation={navigation}>
       <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
       >
         <View style={styles.formContainer}>
           <ValidatedTextInput
             label="Tipo de Documento"
             value={documentType}
             editable={false}
             style={styles.disabledInput}
             onChangeText={handleNonEditableChange} // Pasar la función vacía
           />
           <ValidatedTextInput
             label="Numero de Documento"
             value={documentNumber}
             editable={false}
             style={styles.disabledInput}
             onChangeText={handleNonEditableChange} // Pasar la función vacía
           />
           <ValidatedTextInput
             label="Nombre"
             value={name}
             onChangeText={handleNameChange}
           />
           <ValidatedTextInput
             label="Apellido"
             value={lastName}
             onChangeText={handleLastNameChange}
           />
           <ValidatedTextInput
             label="Correo"
             value={email}
             editable={false}
             keyboardType="email-address"
             style={styles.disabledInput}
             onChangeText={handleNonEditableChange} // Pasar la función vacía
           />
           <ValidatedTextInput
             label="Contraseña"
             value="••••••••"
             secureTextEntry={true}
             editable={false}
             style={styles.disabledInput}
             onChangeText={handleNonEditableChange} // Pasar la función vacía
           />

           <TouchableOpacity style={styles.acceptButton} onPress={handleSaveProfile}>
             <Text style={styles.buttonText}>ACEPTAR</Text>
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
   },
   formContainer: {
     width: '100%',
     marginTop: 20,
   },
   disabledInput: {
     backgroundColor: '#f0f0f0',
     color: 'gray',
   },
   acceptButton: {
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
 });

 export default EditProfileScreen;