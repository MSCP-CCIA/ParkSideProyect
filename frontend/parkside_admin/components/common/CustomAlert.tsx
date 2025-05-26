import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CustomAlert = ({ message, visible, onHide }: { message: string; visible: boolean; onHide: () => void }) => {
    const opacity = new Animated.Value(0);

    useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(onHide);
                }, 3000);
            });
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.alertBox, { opacity }]}>
            <Text style={styles.alertText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    alertBox: {
        position: 'absolute',
        bottom: 30,
        left: '10%',
        right: '10%',
        padding: 12,
        backgroundColor: '#323232',
        borderRadius: 10,
        zIndex: 1000,
        alignItems: 'center',
    },
    alertText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CustomAlert;
