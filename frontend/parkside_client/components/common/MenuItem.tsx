import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface MenuItemProps {
  title: string;
  description: string;
  onPress: () => void;
  style?: any;
  titleStyle?: any;
  descriptionStyle?: any;
}

const MenuItem: FC<MenuItemProps> = ({ title, description, onPress, style, titleStyle, descriptionStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.description, descriptionStyle]}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1976D2', // Color de los botones
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'flex-start', // Alinea el texto a la izquierda
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: 'white',
    fontSize: 14,
  },
});

export default MenuItem;