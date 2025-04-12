import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/(tabs)/LoginScreen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  // Define otras pantallas aquí con sus respectivos parámetros si los tienen
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
  );
};

export default App;