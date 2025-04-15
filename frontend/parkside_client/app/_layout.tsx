import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/(tabs)/LoginScreen';
import RegisterScreen from '../app/(tabs)/RegisterScreen';
import MainMenuScreen from '../app/(tabs)/MainMenuScreen'; // Importa la nueva pantalla
import StateVehicleScreen from '../app/(tabs)/StateVehicleScreen';
import AddCardScreen from '../app/(tabs)/AddCardScreen'
import AddVehicle from '../app/(tabs)/AddVehicleScreen'
import AddVehicleScreen from "../app/(tabs)/AddVehicleScreen";
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined; // Ejemplo
  MainMenu: undefined; // Define la ruta para el menú principal
  AddVehicle: undefined; // Ejemplo de otra pantalla
  StateVehicle: undefined; // Ejemplo de otra pantalla
  AddCard: undefined; // Ejemplo de otra pantalla
  Movimientos: undefined;// Ejemplo de otra pantalla
  // ... otras pantallas
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (

      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StateVehicle" component={StateVehicleScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddCard" component={AddCardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddVehicle" component={AddVehicleScreen} options={{ headerShown: false }} />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
  );
};

export default App;