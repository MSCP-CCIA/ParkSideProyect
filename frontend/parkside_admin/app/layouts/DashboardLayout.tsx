import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';

interface Props {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.container}>
            <Sidebar />
            <View style={styles.main}>
                <Header />
                <View style={styles.content}>
                    {children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: Dimensions.get('window').height, // Esto reemplaza '100vh'
        backgroundColor: '#DCF0F4',
        flex: 1,
    },
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        padding: 24,
    },
});

export default DashboardLayout;
