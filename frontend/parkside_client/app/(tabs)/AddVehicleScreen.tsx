import React, { FC, useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
 import ScreenLayout from '../layouts/ScreenLayout';
 import ValidatedTextInput from '../../components/common/ValidatedTextInput';
 import Dropdown from '../../components/common/Dropdown'; // Import your Dropdown component

 interface AddVehicleScreenProps {
   navigation: any;
 }

 const AddVehicleScreen: FC<AddVehicleScreenProps> = ({ navigation }) => {
   const [selectedVehicleType, setSelectedVehicleType] = useState<string>(''); // Initialize as empty string
   const [vehiclePlate, setVehiclePlate] = useState('');
   const vehicleTypes = ['Carro', 'Motocicleta']; // Example data

   const handleVehicleTypeChange = (value: string) => {
     setSelectedVehicleType(value);
     console.log('Selected Vehicle Type:', value);
   };

   const handleVehiclePlateChange = (text: string) => {
     setVehiclePlate(text);
     console.log('Vehicle Plate:', text);
   };

   const handleAccept = () => {
     console.log('Accept Pressed:', { selectedVehicleType, vehiclePlate });
     // Logic to save the vehicle information
     // Navigate to the next screen if needed
   };

   return (
     <ScreenLayout title="Vehicle Information" navigation={navigation}>
       <KeyboardAvoidingView
         style={styles.container}
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
       >
         <View style={styles.formContainer}>
           <Dropdown
             label="Vehicle Type"
             value={selectedVehicleType}
             items={vehicleTypes}
             onValueChange={handleVehicleTypeChange}
           />

           <ValidatedTextInput
             label="Vehicle Plate"
             placeholder="######"
             value={vehiclePlate}
             onChangeText={handleVehiclePlateChange}
             // Add validation rules if needed
           />

           <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
             <Text style={styles.buttonText}>Accept</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
             <Text style={styles.buttonText}>Cancel</Text>
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
   acceptButton: {
     backgroundColor: '#1976D2', // Example blue color
     paddingVertical: 15,
     borderRadius: 25,
     alignItems: 'center',
     marginTop: 30,
   },
   cancelButton: {
     backgroundColor: '#E0E0E0', // Example light gray color
     paddingVertical: 15,
     borderRadius: 25,
     alignItems: 'center',
     marginTop: 15,
   },
   buttonText: {
     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
   },
 });

 export default AddVehicleScreen;