import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RefreshButtonProps {
    onPress: () => void;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>REFRESCAR</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1976D2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default RefreshButton;
