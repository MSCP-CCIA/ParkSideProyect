import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReusableTableProps {
    headers: string[];
    data: Record<string, string>[];
    renderActions?: (row: Record<string, string>, index: number) => React.ReactNode;
    noDataText?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
                                                         headers,
                                                         data,
                                                         renderActions,
                                                         noDataText = 'No hay datos para mostrar.',
                                                     }) => {

    const getColumnStyle = (index: number) => {
        switch (index) {
            case 0: return styles.col0;
            case 1: return styles.col1;
            case 2: return styles.col2;
            case 3: return styles.col3;
            case 4: return styles.col4;
            default: return styles.defaultCol;
        }
    };

    return (
        <View style={styles.table}>
            <View style={styles.headerRow}>
                {headers.map((header, idx) => (
                    <Text key={idx} style={[styles.headerCell, getColumnStyle(idx)]}>
                        {header}
                    </Text>
                ))}
                {renderActions && (
                    <Text style={[styles.headerCell, styles.colAcciones]}>Acciones</Text>
                )}
            </View>

            {data.length > 0 ? (
                data.map((row, index) => (
                    <View key={index} style={styles.dataRow}>
                        {headers.map((_, idx) => {
                            const value = Object.values(row)[idx];
                            return (
                                <Text key={idx} style={[styles.cell, getColumnStyle(idx)]}>
                                    {value}
                                </Text>
                            );
                        })}
                        {renderActions && (
                            <View style={[styles.colAcciones, styles.actionCell]}>
                                {renderActions(row, index)}
                            </View>
                        )}
                    </View>
                ))
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
    actionCell: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        paddingVertical: 12,
    },
    dataRow: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        textAlign: 'center',
    },
    noData: {
        padding: 16,
        textAlign: 'center',
        color: '#555',
    },
    col0: { width: 160 },
    col1: { width: 160 },
    col2: { width: 160 },
    col3: { width: 220 },
    col4: { width: 130 },
    colAcciones: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultCol: {
        width: 100,
    },
});

export default ReusableTable;
