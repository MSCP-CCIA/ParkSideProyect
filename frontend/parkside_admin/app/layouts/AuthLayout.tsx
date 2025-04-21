import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#DDF0F4',
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
});

export default AuthLayout;