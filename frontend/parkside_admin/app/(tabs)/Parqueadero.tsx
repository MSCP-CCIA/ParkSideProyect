import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import DashboardLayout from '../layouts/DashboardLayout';

const Parqueadero = () => {

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handleVerTarifas = () => {
        navigation.navigate('Tarifas'); // <-- Redirigir a Tarifas
    };
    return (
        <DashboardLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Parqueadero</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.leftSide}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Nombre Estacionamiento:</Text>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>ParkSide 72</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Dirección:</Text>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Calle 72 #15-21</Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Empresa:</Text>
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Blend</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.rightSide}>
                        <View style={styles.noteBox}>
                            <Text style={styles.noteText}>
                                <Text style={styles.boldText}>Nota Importante: </Text>
                                Si se desea crear un nuevo parqueadero y agregarlo al registro primero se debe contactar con la empresa para validar que el estacionamiento exista.
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleVerTarifas}>
                    <Text style={styles.buttonText}>Ver Tarifas</Text>
                </TouchableOpacity>
            </ScrollView>
        </DashboardLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    leftSide: {
        flex: 1,
        marginRight: 20,
    },
    rightSide: {
        flex: 1,
        alignItems: 'center',
    },
    infoRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1976D2',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    inputText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    noteBox: {
        borderWidth: 1,
        borderColor: '#1976D2',
        borderRadius: 8,
        padding: 16,
        width: '90%',
        backgroundColor: '#F2F8FC',
        marginTop: 10,
    },
    noteText: {
        fontSize: 16, // más grande que antes
        color: '#000',
        textAlign: 'center', // centrado
    },
    boldText: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#1976D2',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Parqueadero;
