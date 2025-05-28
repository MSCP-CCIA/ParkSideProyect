import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import DashboardLayout from '../layouts/DashboardLayout';
import ReusableTable from '../../components/common/ReusableTable';
import RefreshButton from '../../components/common/RefreshButton';
import CustomAlert from '../../components/common/CustomAlert';
import {
    getUsuarioPorId,
    updateEstadoUsuario,
} from '../../api/usuariosApi';
import {
    SearchCustomersResponse,
} from '../../models/usuarioModels';

const headers = [
    {label: 'Número de Documento', key: 'id'},
    {label: 'Nombre', key: 'full_name'},
    {label: 'Tipo Documento', key: 'document_type'},
    {label: 'Correo', key: 'email'},
    {label: 'Estado', key: 'is_active'},
];

const Usuarios = () => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [usuarios, setUsuarios] = useState<SearchCustomersResponse[]>([]);
    const [searchId, setSearchId] = useState('');

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const handleToggleState = async (row: SearchCustomersResponse) => {
        try {
            await updateEstadoUsuario({
                employee_id: 1,
                customer_id: row.id,
            });

            const nuevoEstado = !row.is_active;
            const actualizados = usuarios.map((u) =>
                u.id === row.id ? {...u, is_active: nuevoEstado} : u
            );
            setUsuarios(actualizados);

            showAlert(
                `Usuario ${row.full_name} ha sido ${nuevoEstado ? 'activado' : 'desactivado'}.`
            );
        } catch (error) {
            showAlert('Error al cambiar el estado del usuario.');
        }
    };

    const handleSearch = async () => {
        try {
            const data = await getUsuarioPorId({
                employee_id: 1,
                customer_id: parseInt(searchId),
            });
            setUsuarios([data]);
        } catch (error) {
            showAlert('No se encontró el usuario.');
            setUsuarios([]);
        }
    };

    return (
        <DashboardLayout>
            <ScrollView>
                <Text style={styles.title}>Usuarios</Text>

                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Buscar por Número de Documento"
                        style={styles.searchInput}
                        value={searchId}
                        onChangeText={setSearchId}
                        keyboardType="numeric"
                    />
                    <RefreshButton onPress={handleSearch}/>
                </View>

                <ReusableTable
                    headers={headers}
                    data={usuarios.map((u) => ({
                        id: u.id.toString(),
                        full_name: u.full_name,
                        document_type: u.document_type,
                        email: u.email,
                        is_active: u.is_active ? 'Activo' : 'Inactivo',
                    }))}
                    renderActions={(row, index) => (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleToggleState(usuarios[index])}
                        >
                            <Text style={styles.actionButtonText}>Activar / Desactivar</Text>
                        </TouchableOpacity>
                    )}
                    noDataText="No hay usuarios registrados."
                />

            </ScrollView>

            <CustomAlert
                message={alertMessage}
                visible={alertVisible}
                onHide={() => setAlertVisible(false)}
            />
        </DashboardLayout>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: '#1976D2',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    actionButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Usuarios;
