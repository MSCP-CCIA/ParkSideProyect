import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener instalada esta librería

interface DropdownProps {
  label: string;
  value: string;
  items: string[];
  onValueChange: (newValue: string) => void;
  style?: any;
}

const Dropdown: FC<DropdownProps> = ({ label, value, items, onValueChange, style }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelectItem = (item: string) => {
    onValueChange(item);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={toggleOpen} style={styles.selectedItemContainer}>
        <Text style={styles.selectedValue}>{value || 'Seleccionar'}</Text>
        <MaterialIcons name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'} size={24} color="gray" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <TouchableOpacity key={item} onPress={() => handleSelectItem(item)} style={styles.item}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  selectedItemContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedValue: {
    fontSize: 16,
    color: 'black',
  },
  itemsContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: 'white',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default Dropdown;