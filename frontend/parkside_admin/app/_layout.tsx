import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // Ocultamos el encabezado como en la app móvil
            }}
        >
            {/* Definimos explícitamente la ruta para ChangePassword si deseas más control */}
            <Stack.Screen name="(tabs)/Login" />
            <Stack.Screen name="(tabs)/ChangePassword" />
        </Stack>
    );
}
