import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/(tabs)/Login';
import ChangePassword from '../app/(tabs)/ChangePassword';
import Usuarios from '../app/(tabs)/Usuarios';
import CrearUsuario from "@/app/(tabs)/CrearUsuario";
import EditarPerfil from "@/app/(tabs)/EditarPerfil";

type RootStackParamList = {
    Login: undefined;
    ChangePassword: undefined;
    Usuarios: undefined;
    CrearUsuario: undefined;
    EditarPerfil: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (

            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name="Usuarios" component={Usuarios} options={{ headerShown: false }} />
                <Stack.Screen name="CrearUsuario" component={CrearUsuario} options={{ headerShown: false }} />
                <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }} />

            </Stack.Navigator>
    );
};

export default App;
