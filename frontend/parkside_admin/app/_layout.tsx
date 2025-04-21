import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../app/(tabs)/Login';
import ChangePassword from '../app/(tabs)/ChangePassword';

type RootStackParamList = {
    Login: undefined;
    ChangePassword: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (

            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            </Stack.Navigator>
    );
};

export default App;
