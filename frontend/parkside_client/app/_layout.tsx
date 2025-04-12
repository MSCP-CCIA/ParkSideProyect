import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/(tabs)/LoginScreen';
import RegisterScreen from '../app/(tabs)/RegisterScreen'; // Importa la nueva pantalla

type RootStackParamList = {
  Login: undefined;
  Register: undefined; // Define la ruta para la pantalla de registro
  Home: undefined; // Ejemplo de otra pantalla
  // ... otras pantallas
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>

  );
};

export default App;