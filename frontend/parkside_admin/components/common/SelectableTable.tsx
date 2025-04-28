import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderItem {
    label: string;
    key: string;
}

interface SelectableTableProps {
    headers: HeaderItem[];
    data: Record<string, string>[];
    selectedRows: number[];
    onSelectRow: (index: number) => void;
    noDataText?: string;
}

const SelectableTable: React.FC<SelectableTableProps> = ({
                                                             headers,
                                                             data,
                                                             selectedRows,
                                                             onSelectRow,
                                                             noDataText = 'No hay datos para mostrar.',
                                                         }) => {
    const totalColumns = headers.length;

    const getColumnStyle = (): { flex: number; textAlign: 'center' } => ({
        flex: 1,
        textAlign: 'center',
    });

    return (
        <View style={styles.table}>
            {/* Encabezado */}
            <View style={styles.headerRow}>
                {headers.map((header, idx) => (
                    <View key={idx} style={[styles.cellWrapper, getColumnStyle()]}>
                        <Text style={styles.headerCell}>{header.label}</Text>
                    </View>
                ))}
            </View>

            {/* Filas */}
            {data.length > 0 ? (
                data.map((row, rowIndex) => {
                    const isSelected = selectedRows.includes(rowIndex);
                    return (
                        <TouchableOpacity
                            key={rowIndex}
                            onPress={() => onSelectRow(rowIndex)}
                            style={[
                                styles.dataRow,
                                isSelected && styles.selectedRow, // Si está seleccionado, cambiamos el fondo
                            ]}
                        >
                            {headers.map((header, colIndex) => (
                                <View key={colIndex} style={[styles.cellWrapper, getColumnStyle()]}>
                                    <Text style={styles.cell}>{row[header.key]}</Text>
                                </View>
                            ))}
                        </TouchableOpacity>
                    );
                })
            ) : (
                <Text style={styles.noData}>{noDataText}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: '#1976D2',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        paddingVertical: 12,
        alignItems: 'center',
    },
    dataRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: 'center',
    },
    selectedRow: {
        backgroundColor: '#cce5ff', // azulito claro cuando está seleccionado
    },
    cellWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
    cell: {
        textAlign: 'center',
        fontSize: 14,
    },
    noData: {
        padding: 16,
        textAlign: 'center',
        color: '#555',
    },
});

export default SelectableTable;
