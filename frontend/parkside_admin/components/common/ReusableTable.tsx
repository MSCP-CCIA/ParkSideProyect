import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderItem {
  label: string;
  key: string;
}

interface ReusableTableProps {
  headers: HeaderItem[];
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
  const totalColumns = headers.length + (renderActions ? 1 : 0);

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
        {renderActions && (
          <View style={[styles.cellWrapper, getColumnStyle()]}>
            <Text style={styles.headerCell}>Acciones</Text>
          </View>
        )}
      </View>

      {/* Filas */}
      {data.length > 0 ? (
        data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.dataRow}>
            {headers.map((header, colIndex) => (
              <View key={colIndex} style={[styles.cellWrapper, getColumnStyle()]}>
                <Text style={styles.cell}>{row[header.key]}</Text>
              </View>
            ))}
            {renderActions && (
              <View style={[styles.cellWrapper, getColumnStyle()]}>
                {(() => {
                  const content = renderActions(row, rowIndex);
                  if (typeof content === 'string' || typeof content === 'number') {
                    return <Text>{content}</Text>;
                  }
                  return content;
                })()}
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

export default ReusableTable;
