import React, { useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Pressable,
} from 'react-native';

const iconoMas = require('../../assets/images/mas-icono.png');
const iconoCerrar = require('../../assets/images/icono-cerrar.png');

interface Props {
    onBlock: () => void;
    onDeactivate: () => void;
}

const FloatingActionsButton: React.FC<Props> = ({ onBlock, onDeactivate }) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Image source={iconoMas} style={styles.iconoMas} />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    <Pressable style={styles.modalContainer} onPress={() => {}}>
                        {/* Botón de cierre */}
                        <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                            <Image source={iconoCerrar} style={styles.closeIcon} />
                        </TouchableOpacity>

                        {/* Botones de acción */}
                        <TouchableOpacity style={styles.blockButton} onPress={() => {
                            setVisible(false);
                            onBlock();
                        }}>
                            <Text style={styles.blockText}>BLOQUEAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deactivateButton} onPress={() => {
                            setVisible(false);
                            onDeactivate();
                        }}>
                            <Text style={styles.deactivateText}>DESACTIVAR</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    iconoMas: {
        width: 20,
        height: 20,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#DDF0F4',
        padding: 24,
        borderRadius: 12,
        width: 220,
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    blockButton: {
        backgroundColor: '#1976D2',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    deactivateButton: {
        backgroundColor: '#178591',
        paddingVertical: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    blockText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deactivateText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FloatingActionsButton;
