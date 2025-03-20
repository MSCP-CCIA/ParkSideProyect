import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginS from "./LoginS";
import RegisterS from "./RegisterS";
import HomeScreen from "./HomeScreen";
import InformacionVehiculo from "./InformacionVehiculo";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
