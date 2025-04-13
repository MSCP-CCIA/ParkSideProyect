import React, { FC } from 'react';
 import { TouchableOpacity, StyleSheet } from 'react-native';
 import { Ionicons } from '@expo/vector-icons';

 interface BackButtonProps {
   onPress: () => void;
 }

 const BackButton: FC<BackButtonProps> = ({ onPress }) => {
   return (
     <TouchableOpacity onPress={onPress} style={styles.button}>
       <Ionicons name="chevron-back" size={24} color="black" />
     </TouchableOpacity>
   );
 };

 const styles = StyleSheet.create({
   button: {
     padding: 8,
   },
 });

 export default BackButton;