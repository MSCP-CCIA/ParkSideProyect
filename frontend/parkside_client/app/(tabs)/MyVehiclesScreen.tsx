import React, { FC, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';

interface MyVehiclesScreenProps {
    navigation: any;
}

interface Vehicle {
    id: string;
    Tipo: string;
    Placa: string;
    Documento: string;
}

const MyVehiclesScreen: FC<MyVehiclesScreenProps> = ({ navigation }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        { id: '1', Tipo: 'Moto', Placa: 'INL34H', Documento: '1036362895' },
        { id: '2', Tipo: 'Carro', Placa: 'KQZ983', Documento: '1036362895' },
    ]);

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleAddVehicle = () => {
        navigation.navigate('AddVehicle');
    };

    const handleDelete = () => {
        const selectedVehicle = vehicles.find((v) => v.id === selectedId);

        if (!selectedVehicle) return;

        Alert.alert(
            'Eliminar Vehículo',
            `¿Estás seguro de eliminar el vehículo con placa ${selectedVehicle.Placa}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sí, eliminar',
                    onPress: () => {
                        setVehicles(vehicles.filter((v) => v.id !== selectedId));
                        setSelectedId(null);
                        Alert.alert('Vehículo eliminado', 'Se ha eliminado correctamente.');
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }: { item: Vehicle }) => {
        const isSelected = item.id === selectedId;
        return (
            <TouchableOpacity
                onPress={() => setSelectedId(item.id)}
                style={[
                    styles.row,
                    { backgroundColor: isSelected ? '#cfe8ff' : '#fff' },
                ]}
            >
                <Text style={[styles.cell, { flex: 2 }]}>{item.Tipo}</Text>
                <Text style={[styles.cell, { flex: 2 }]}>{item.Placa}</Text>
                <Text style={[styles.cell, { flex: 3 }]}>{item.Documento}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout title="Mis Vehículos" navigation={navigation}>
            <View style={styles.container}>
                <Text style={styles.title}>Consulta tus Vehículos</Text>

                {vehicles.length > 0 ? (
                    <>
                        <Text style={styles.instructions}>
                            Para eliminar un vehículo, primero debes seleccionarlo de la tabla.
                        </Text>

                        <View style={styles.listHeader}>
                            <Text style={[styles.headerColumn, { flex: 2 }]}>Tipo</Text>
                            <Text style={[styles.headerColumn, { flex: 2 }]}>Placa</Text>
                            <Text style={[styles.headerColumn, { flex: 3 }]}>Documento</Text>
                        </View>

                        <FlatList
                            data={vehicles}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            extraData={selectedId}
                        />
                    </>
                ) : (
                    <Text style={styles.noData}>No tienes vehículos registrados</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleAddVehicle}>
                    <Text style={styles.buttonText}>AGREGAR VEHÍCULO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.deleteButton,
                        { backgroundColor: selectedId ? '#0288A8' : '#cccccc' },
                    ]}
                    onPress={handleDelete}
                    disabled={!selectedId}
                >
                    <Text style={styles.deleteButtonText}>ELIMINAR</Text>
                </TouchableOpacity>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#e6f4f9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'center',
    },
    instructions: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },
    listHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    headerColumn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    cell: {
        fontSize: 16,
        color: 'black',
    },
    noData: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#1976D2',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyVehiclesScreen;
