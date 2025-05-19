import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/(tabs)/Login';
import ChangePassword from '../app/(tabs)/ChangePassword';
import Usuarios from '../app/(tabs)/Usuarios';
import EditarPerfil from "@/app/(tabs)/EditarPerfil";
import Reportes from "@/app/(tabs)/Reportes";
import RegistroEntrada from "@/app/(tabs)/RegistroEntrada";
import RegistroSalida from "@/app/(tabs)/RegistroSalida";
import InfoVehiculos from "@/app/(tabs)/InfoVehiculos";
import Parqueadero from "@/app/(tabs)/Parqueadero";
import Tarifas from "@/app/(tabs)/Tarifas";
import CrearTarifas from "@/app/(tabs)/CrearTarifas";

type RootStackParamList = {
    Login: undefined;
    ChangePassword: undefined;
    Usuarios: undefined;
    EditarPerfil: undefined;
    Reportes: undefined;
    RegistroEntrada: undefined;
    RegistroSalida: undefined;
    InfoVehiculos: undefined;
    Parqueadero: undefined;
    Tarifas: undefined;
    CrearTarifas: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (

            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name="Usuarios" component={Usuarios} options={{ headerShown: false }} />
                <Stack.Screen name="InfoVehiculos" component={InfoVehiculos} options={{ headerShown: false }} />
                <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }} />
                <Stack.Screen name="Reportes" component={Reportes} options={{ headerShown: false }} />
                <Stack.Screen name="RegistroEntrada" component={RegistroEntrada} options={{ headerShown: false }} />
                <Stack.Screen name="RegistroSalida" component={RegistroSalida} options={{ headerShown: false }} />
                <Stack.Screen name="Parqueadero" component={Parqueadero} options={{ headerShown: false }} />
                <Stack.Screen name="Tarifas" component={Tarifas} options={{ headerShown: false }} />
                <Stack.Screen name="CrearTarifas" component={CrearTarifas} options={{ headerShown: false }} />


            </Stack.Navigator>
    );
};

export default App;
