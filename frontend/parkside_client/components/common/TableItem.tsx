import React, { FC } from 'react';
 import { View, Text, StyleSheet } from 'react-native';

 interface TableItemProps {
   itemData: { [key: string]: string };
   columnStyles?: { [key: string]: any };
   columnFlex?: { [key: string]: number };
   index?: number; // Optional index
 }

 const TableItem: FC<TableItemProps> = ({ itemData, columnStyles = {}, columnFlex = {}, index }) => {
   return (
     <View style={[
       styles.container,
       typeof index === 'number' && index % 2 === 0 ? styles.evenRow : {},
       typeof index === 'number' && index % 2 !== 0 ? styles.oddRow : {},
     ]}>
       {Object.keys(itemData).map((key) => (
         <Text
           key={key}
           style={[
             styles.column,
             columnStyles[key],
             columnFlex[key] ? { flex: columnFlex[key] } : {},
           ]}
         >
           {itemData[key]}
         </Text>
       ))}
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flexDirection: 'row',
     paddingVertical: 15,
     borderBottomWidth: 1,
     borderColor: '#eee',
     borderRadius: 8,
     backgroundColor: 'white',
     marginBottom: 8,
     paddingHorizontal: 10,
     alignItems: 'center',
   },
   column: {
     fontSize: 16,
     color: 'black',
   },
   evenRow: {
     // Optional styling for even rows (e.g., a slightly different background)
     backgroundColor: '#f9f9f9',
   },
   oddRow: {
     // Optional styling for odd rows (default is white)
   },
 });

 export default TableItem;