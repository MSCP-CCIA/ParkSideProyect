import React, { FC, useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
 import MainMenuLayout from '../layouts/MainMenuLayout';
 import MenuItem from '../../components/common/MenuItem';
 import MenuButton from '../../components/common/MenuButton';
 import SlidingMenuView from '../../components/common/SlidingMenuView';
 import { Ionicons } from '@expo/vector-icons';

 interface MainMenuScreenProps {
   navigation: any;
 }

 const MainMenuScreen: FC<MainMenuScreenProps> = ({ navigation }) => {
   const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

   const handleOpenMenu = () => {
     setIsMenuVisible(true);
   };

   const handleCloseMenu = () => {
     setIsMenuVisible(false);
   };

   const navigateTo = (routeName: string) => {
     handleCloseMenu();
     navigation.navigate(routeName);
   };

   const handleCerrarSesion = () => {
     handleCloseMenu();
     navigation.navigate('Login');
   };

   return (
     <MainMenuLayout>
       <View style={styles.header}>
         <MenuButton onPress={handleOpenMenu} />
         <Text style={styles.title}>Bienvenido</Text>
       </View>
       <Text style={styles.subtitle}>Escoge alguna de las siguientes opciones:</Text>

       <MenuItem
         title="AGREGAR INFO VEHICULO"
         description="INFORMACIÓN DEL VEHICULO: Ingresa la información importante de tu vehículo"
         onPress={() => navigateTo('AddVehicle')}
         style={styles.menuItem}
       />
       <MenuItem
         title="ESTADO"
         description="ESTADO: Revisa en tiempo real el estado de tu vehículo"
         onPress={() => navigateTo('StateVehicle')}
         style={styles.menuItem}
       />
       <MenuItem
         title="AGREGAR TARJETA"
         description="AGREGAR TARJETA: Agrega un método de pago para pagar tu estadía del parqueadero"
         onPress={() => navigateTo('AddCard')}
         style={styles.menuItem}
       />
       <MenuItem
         title="MOVIMIENTOS"
         description="MOVIMIENTOS: Revisa el historial de parqueos que hayas hecho"
         onPress={() => navigateTo('Movimientos')}
         style={styles.menuItem}
       />

       <SlidingMenuView isVisible={isMenuVisible} onClose={handleCloseMenu}>
         <View style={styles.drawerContainer}>


           <Text style={styles.drawerTitle}>Menú</Text>

           <TouchableOpacity onPress={() => navigateTo('EditProfile')} style={styles.drawerItem}>
             <Ionicons name="person-outline" size={24} color="#1976D2" style={styles.drawerIcon} />
             <Text style={styles.drawerText}>Editar Perfil</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => navigateTo('InfoVehiculo')} style={styles.drawerItem}>
             <Ionicons name="add-circle-outline" size={24} color="#1976D2" style={styles.drawerIcon} />
             <Text style={styles.drawerText}>Info Vehiculo</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => navigateTo('StateVehicle')} style={styles.drawerItem}>
             <Ionicons name="alert-circle-outline" size={24} color="#1976D2" style={styles.drawerIcon} />
             <Text style={styles.drawerText}>Estado</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => navigateTo('AddCard')} style={styles.drawerItem}>
             <Ionicons name="card-outline" size={24} color="#1976D2" style={styles.drawerIcon} />
             <Text style={styles.drawerText}>Nueva Tarjeta</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => navigateTo('Movimientos')} style={styles.drawerItem}>
             <Ionicons name="stats-chart-outline" size={24} color="#1976D2" style={styles.drawerIcon} />
             <Text style={styles.drawerText}>Movimientos</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={() => navigateTo('Configuracion')} style={styles.drawerItem}>
             <Ionicons name="settings-outline" size={24} color="#1976D2" style={styles.drawerIcon} />
             <Text style={styles.drawerText}>Configuración</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={handleCerrarSesion} style={styles.drawerSignOutButton}>
             <Text style={styles.drawerSignOutButtonText}>Cerrar Sesión</Text>
           </TouchableOpacity>
         </View>
       </SlidingMenuView>
     </MainMenuLayout>
   );
 };

 const styles = StyleSheet.create({
   header: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 16,
     paddingLeft: 10,
   },
   title: {
     fontSize: 28,
     fontWeight: 'bold',
     marginLeft: 20,
     color: 'black',
   },
   subtitle: {
     fontSize: 16,
     marginBottom: 32,
     textAlign: 'center',
     color: 'gray',
   },
   menuItem: {},
   drawerContainer: {
     padding: 20,
   },
   closeIconContainer: {
     alignSelf: 'flex-end',
     marginBottom: 10,
   },
   drawerTitle: {
     fontSize: 20,
     fontWeight: 'bold',
     marginBottom: 20,
     textAlign: 'center',
   },
   drawerItem: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingVertical: 15,
     borderBottomWidth: 1,
     borderBottomColor: '#ddd',
   },
   drawerIcon: {
     marginRight: 15,
   },
   drawerText: {
     fontSize: 16,
     color: 'black',
     flexShrink: 1, // Permite que el texto se encoja para evitar el salto de línea
   },
   drawerSignOutButton: {
     marginTop: 30,
     paddingVertical: 15,
     alignItems: 'center',
     backgroundColor: '#1976D2',
     borderRadius: 5,
     width: '80%',
     alignSelf: 'center',
   },
   drawerSignOutButtonText: {
     fontSize: 16,
     color: 'white',
     fontWeight: 'bold',
   },
 });

 export default MainMenuScreen;