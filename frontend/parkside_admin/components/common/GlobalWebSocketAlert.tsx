import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

interface Props {
    visible: boolean;
    message: string;
    onClose: () => void;
}

const GlobalWebSocketAlert: React.FC<Props> = ({ visible, message, onClose }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.title}>🚨 Error en lectura de placa</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Entendido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    alertBox: {
        maxWidth: 400,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignItems: "center",
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#B00020",
        marginBottom: 10,
        textAlign: "center",
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    button: {
        backgroundColor: "#1976D2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default GlobalWebSocketAlert;
