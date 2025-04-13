import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons

interface MenuButtonProps {
  onPress: () => void;
  style?: any;
  iconSize?: number;
  iconColor?: string;
}

const MenuButton: FC<MenuButtonProps> = ({ onPress, style, iconSize = 30, iconColor = 'black' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Ionicons name="menu-outline" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default MenuButton;