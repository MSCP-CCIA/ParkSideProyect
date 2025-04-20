import React from 'react';
import { View, StyleSheet } from 'react-native';

interface WebLayoutProps {
    children: React.ReactNode;
}

const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
    return <View style={styles.page}>{children}</View>;
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: '100%',
        backgroundColor: '#DDF0F4', // Fondo azul claro
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default WebLayout;
