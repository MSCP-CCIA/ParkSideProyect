import React, { FC, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ScreenLayout from '../layouts/ScreenLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import {SearchCustomerVehiclesRequest, SearchVehiclesResponse} from '../../models/vehicle_models'
import {listVehicles} from '../../api/listVehiclesApi'




// API Service para eliminar vehículo
interface DeleteVehicleRequest {
    customer_id: number;
    plate: string;
}

const deleteVehicle = async (deleteRequest: DeleteVehicleRequest): Promise<AxiosResponse<any>> => {
    try {
        const response = await axios.delete(
            'http://127.0.0.1:8000/api/v1/vehicle/delete-vehicle-{plate}',
            { data: deleteRequest } // Envuelve deleteRequest dentro de la propiedad 'data'
        );
        return response;
    } catch (error: any) {
        throw error;
    }
};

interface MyVehiclesScreenProps {
    navigation: any;
}

interface VehicleResponse {
    vehicles: {
        type: string;
        plate: string;
    }[];
}

interface Vehicle {
    id: string; // Mantenemos el id para la FlatList, será generado localmente
    Tipo: string;
    Placa: string;
    Documento: string; // Mantenemos el Documento aunque no venga de la API
}

const MyVehiclesScreen: FC<MyVehiclesScreenProps> = ({ navigation }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customerId, setCustomerId] = useState<number | null>(null);

    // Obtener el customer_id del AsyncStorage
    useEffect(() => {
        const getCustomerIdFromStorage = async () => {
            try {
                const storedData = await AsyncStorage.getItem('authToken');
                if (storedData) {
                    const idString = await AsyncStorage.getItem('userId');
                    const id = idString ? parseInt(idString, 10) : null;
                    setCustomerId(id);
                } else {
                    // Manejar el caso en que no hay datos de inicio de sesión
                    Alert.alert('Error', 'No se ha iniciado sesión. Por favor, inicie sesión.');
                    navigation.navigate('AddVehicle'); // Redirigir a la pantalla de inicio de sesión
                }
            } catch (error) {
                Alert.alert('Error', 'No se pudo obtener la información del usuario.');
                navigation.navigate('Login');
            } finally {
                setLoading(false); // Asegúrate de que loading se establece en false aquí también
            }
        };
        setLoading(true); // Inicia la carga al intentar obtener el ID
        getCustomerIdFromStorage();
    }, [navigation]);

    useEffect(() => {
        const fetchVehicles = async () => {
            if (customerId) {
                setLoading(true);
                setError(null);
                try {
                    const request: SearchCustomerVehiclesRequest = {
                          customer_id: customerId
                    }
                    const response = await listVehicles(request);

                    if (response && response.vehicles) {
                        const mappedVehicles = response.vehicles.map((v, index) => ({
                            id: `${index + 1}`, // Generamos un ID secuencial localmente
                            Tipo: v.type,
                            Placa: v.plate,
                            Documento: customerId.toString(), // Usamos el customerId obtenido
                        }));
                        setVehicles(mappedVehicles);
                    } else {
                        setError('Error al recibir la lista de vehículos.');
                    }
                } catch (err: any) {
                    setError(`Error al conectar con la API: ${err.message}`);
                } finally {
                    setLoading(false);
                }
            }
        };

        // Llama a fetchVehicles solo si customerId tiene un valor
        if (customerId) {
            fetchVehicles();
        }
    }, [customerId]); // Se vuelve a ejecutar si customerId cambia

    const handleAddVehicle = () => {
        navigation.navigate('AddVehicle');
    };

    const handleDelete = async () => {
        const selectedVehicle = vehicles.find((v) => v.id === selectedId);
        if (selectedVehicle && customerId) {
            setLoading(true);
            setError(null);
            try {
                const deleteRequest: DeleteVehicleRequest = {
                    customer_id: customerId, // Usamos el customerId del estado
                    plate: selectedVehicle.Placa,
                };
                await deleteVehicle(deleteRequest);
                // Si la eliminación es exitosa, actualiza la lista localmente
                setVehicles(vehicles.filter((v) => v.id !== selectedId));
                setSelectedId(null);
                Alert.alert('Vehículo eliminado', 'Se ha eliminado correctamente.');
            } catch (err: any) {
                setError(`Error al eliminar el vehículo: ${err.message}`);
                Alert.alert('Error', 'No se pudo eliminar el vehículo. Por favor, intenta de nuevo.');
            } finally {
                setLoading(false);
            }
        } else {
            Alert.alert('Advertencia', 'Por favor, selecciona un vehículo para eliminar.');
        }
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

    if (loading) {
        return (
            <ScreenLayout title="Mis Vehículos" navigation={navigation}>
                <View style={styles.container}>
                    <Text style={styles.loading}>Cargando vehículos...</Text>
                </View>
            </ScreenLayout>
        );
    }

    if (error) {
        return (
            <ScreenLayout title="Mis Vehículos" navigation={navigation}>
                <View style={styles.container}>
                    <Text style={styles.error}>{error}</Text>
                </View>
            </ScreenLayout>
        );
    }

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
    loading: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 40,
        color: 'blue',
    },
    error: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 40,
        color: 'red',
    },
});

export default MyVehiclesScreen;