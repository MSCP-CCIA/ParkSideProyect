import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainMenuLayout from '../layouts/MainMenuLayout'; // Usa el layout específico del menú
import MenuItem from '../../components/common/MenuItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
interface MainMenuScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const MainMenuScreen: FC<MainMenuScreenProps> = ({ navigation }) => {
  const handleAgregarVehiculo = () => {
    navigation.navigate('AgregarVehiculo'); // Navegar a la pantalla correspondiente
  };

  const handleEstado = () => {
    navigation.navigate('EstadoVehiculo'); // Navegar a la pantalla correspondiente
  };

  const handleAgregarTarjeta = () => {
    navigation.navigate('AgregarTarjeta'); // Navegar a la pantalla correspondiente
  };

  const handleMovimientos = () => {
    navigation.navigate('Movimientos'); // Navegar a la pantalla correspondiente
  };

  return (
    <MainMenuLayout>
      <Text style={styles.title}>Bienvenido</Text>
      <Text style={styles.subtitle}>Escoge alguna de las siguientes opciones:</Text>

      <MenuItem
        title="AGREGAR INFO VEHICULO"
        description="INFORMACIÓN DEL VEHICULO: Ingresa la información importante de tu vehículo"
        onPress={handleAgregarVehiculo}
        style={styles.menuItem}
      />
      <MenuItem
        title="ESTADO"
        description="ESTADO: Revisa en tiempo real el estado de tu vehículo"
        onPress={handleEstado}
        style={styles.menuItem}
      />
      <MenuItem
        title="AGREGAR TARJETA"
        description="AGREGAR TARJETA: Agrega un método de pago para pagar tu estadía del parqueadero"
        onPress={handleAgregarTarjeta}
        style={styles.menuItem}
      />
      <MenuItem
        title="MOVIMIENTOS"
        description="MOVIMIENTOS: Revisa el historial de parqueos que hayas hecho"
        onPress={handleMovimientos}
        style={styles.menuItem}
      />
    </MainMenuLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: 'gray',
  },
  menuItem: {
    // Los estilos específicos del botón ya están en MenuItem
  },
});

export default MainMenuScreen;