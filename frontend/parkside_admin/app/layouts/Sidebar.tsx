import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, usePathname } from 'expo-router';

const Sidebar = () => {
    const pathname = usePathname();

    const isActive = (route: string) => pathname === route;

    return (
        <View style={styles.sidebar}>
            <Text style={styles.title}>Parkside Admin</Text>

            <Pressable
                onPress={() => router.push('/(tabs)/Login')}
                style={[styles.link, isActive('/(tabs)/Login') && styles.active]}
            >
                <Text style={styles.linkText}>Login</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/(tabs)/Usuarios')}
                style={[styles.link, isActive('/(tabs)/Usuarios') && styles.active]}
            >
                <Text style={styles.linkText}>Usuarios</Text>
            </Pressable>

            <Pressable
                onPress={() => router.push('/(tabs)/Vehiculos')}
                style={[styles.link, isActive('/(tabs)/Vehiculos') && styles.active]}
            >
                <Text style={styles.linkText}>Vehículos</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: 220,
        padding: 20,
        backgroundColor: '#f0f0f0',
        height: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    link: {
        paddingVertical: 10,
        marginBottom: 5,
    },
    active: {
        backgroundColor: '#d0e4f7',
        borderRadius: 8,
    },
    linkText: {
        fontSize: 16,
        color: 'black',
    },
});

export default Sidebar;