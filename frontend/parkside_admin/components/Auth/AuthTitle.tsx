import React, { FC } from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface AuthTitleProps {}

const AuthTitle: FC<AuthTitleProps> = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/car_parking_icon.png') as ImageSourcePropType}
                style={styles.icon}
                resizeMode="contain"
            />
            <Text style={styles.title}>Bienvenido Admin</Text>
            <Text style={styles.subtitle}>Inicia sesión en ParkSide</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 300,
        height: 300,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
    },
});

export default AuthTitle;