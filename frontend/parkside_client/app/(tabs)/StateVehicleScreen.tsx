import React, { FC, useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
 import ScreenLayout from '../layouts/ScreenLayout';

 interface StateVehicleScreenProps {
   navigation: any;
 }

 const StateVehicleScreen: FC<StateVehicleScreenProps> = ({ navigation }) => {
   const [estadoVehiculo, setEstadoVehiculo] = useState('ESTACIONADO'); // Estado inicial

   const handlePagar = () => {
     // Lógica para iniciar el proceso de pago
     console.log('Pagar estacionamiento');
     // Aquí podrías navegar a la pantalla de pago
   };

   return (
     <ScreenLayout title="Estado" navigation={navigation}>
       <View style={styles.container}>
         <Text style={styles.label}>Placa del Vehículo</Text>
         <View style={styles.plateContainer}>
           <Text style={styles.plateText}>INL34H</Text>
         </View>

         <Text style={styles.label}>Estado actual del vehículo:</Text>
         <View style={styles.estadoContainer}>
           <Text style={styles.estadoText}>{estadoVehiculo}</Text>
         </View>

         <Text style={styles.infoText}>
           Una vez que salgas del parqueadero el estado del vehículo pasara a decir NO REGISTRA.
         </Text>

         <View style={styles.buttonContainer}>
           <Text style={styles.buttonLabel}>Dejar de contar y cobrar</Text>
           <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
             <Text style={styles.payButtonText}>PAGAR</Text>
           </TouchableOpacity>
         </View>

         <Text style={styles.importantText}>
           Importante: Tener en cuenta que solo puede realizar el pago una vez que
           vayas a salir del parqueadero con tu vehículo, no antes. Gracias por su
           atención.
         </Text>
       </View>
     </ScreenLayout>
   );
 };

 const styles = StyleSheet.create({
   safeArea: {
     flex: 1,
     backgroundColor: '#F0F8FF', // Fondo celeste claro
   },
   header: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingHorizontal: 16,
     paddingVertical: 10,
     borderBottomWidth: 1,
     borderBottomColor: '#ddd',
   },
   title: {
     fontSize: 22,
     fontWeight: 'bold',
     color: 'black',
     marginLeft: 20,
   },
   container: {
     flex: 1,
     padding: 20,
     alignItems: 'center', // Centra horizontalmente todo el contenido
   },
   label: {
     fontSize: 26,
     fontWeight: 'bold',
     marginBottom: 10,
     color: 'black',
     textAlign: 'center', // Centra el texto de la etiqueta
     width: '100%', // Asegura que la etiqueta ocupe todo el ancho para que `textAlign: 'center'` funcione
   },
   plateContainer: {
     backgroundColor: '#FFD700', // Amarillo
     paddingVertical: 15,
     paddingHorizontal: 30,
     borderRadius: 5, // Bordes ligeramente redondeados
     marginBottom: 20,
     borderWidth: 2, // Borde más grueso
     borderColor: '#000', // Borde negro
     shadowColor: '#000', // Sombra para dar profundidad
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 3,
     elevation: 5, // Elevación para Android
   },
   plateText: {
     fontSize: 35,
     fontWeight: 'bold',
     color: 'black',
     letterSpacing: 5, // Espaciado entre letras
   },
   estadoContainer: {
     backgroundColor: '#E0FFFF', // Celeste claro
     paddingVertical: 15,
     paddingHorizontal: 30,
     borderRadius: 10,
     marginBottom: 20,
   },
   estadoText: {
     fontSize: 20,
     fontWeight: 'bold',
     color: 'black',
   },
   infoText: {
     fontSize: 16,
     color: 'gray',
     textAlign: 'center',
     marginBottom: 30,
   },
   buttonContainer: {
     alignItems: 'center',
     marginBottom: 30,
   },
   buttonLabel: {
     fontSize: 18,
     fontWeight: 'bold',
     color: 'black',
     marginBottom: 10,
     textAlign: 'center', // Centra el texto del botón label
   },
   payButton: {
     backgroundColor: '#1976D2', // Azul
     paddingVertical: 15,
     paddingHorizontal: 50,
     borderRadius: 10,
   },
   payButtonText: {
     fontSize: 20,
     fontWeight: 'bold',
     color: 'white',
   },
   importantText: {
     fontSize: 14,
     color: 'black',
     textAlign: 'center',
   },
 });

 export default StateVehicleScreen;