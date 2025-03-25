import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginS from "./LoginS";
import RegisterS from "./RegisterS";
import HomeScreen from "./HomeScreen";
import InformacionVehiculo from "./InformacionVehiculo";
import Estado from "./Estado";
import Movimientos from "./Movimientos";
import InfoTarjeta from "./InfoTarjeta";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginS}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterS}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InformacionVehiculo"
          component={InformacionVehiculo}
          options={{
            title: "Información del Vehículo",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Estado"
          component={Estado}
          options={{
            title: "Estado del Vehículo",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Movimientos"
          component={Movimientos}
          options={{
            title: "Movimientos",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="InfoTarjeta"
          component={InfoTarjeta}
          options={{
            title: "Información de Tarjeta",
            headerStyle: { backgroundColor: "#000" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
