import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Header = () => {
    const adminName = 'Admin';

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Hola, {adminName}</Text>
            <Image
                source={require('../../assets/images/u_user.png')}
                style={styles.avatar}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#DCF0F4',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    avatar: {
        width: 30,
        height: 30,
    },
});

export default Header;
