import React, { FC } from 'react';
 import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';

 interface SlidingMenuViewProps {
   isVisible: boolean;
   onClose: () => void;
   children: React.ReactNode;
 }

 const SlidingMenuView: FC<SlidingMenuViewProps> = ({ isVisible, onClose, children }) => {
   return (
     <Modal
       animationType="slide"
       transparent={true}
       visible={isVisible}
       onRequestClose={onClose}
     >
       <TouchableOpacity
         style={styles.background}
         activeOpacity={1}
         onPress={onClose}
       >
         <View style={styles.content}>
           {children}
           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
             <Text style={styles.closeButtonText}>Cerrar</Text>
           </TouchableOpacity>
         </View>
       </TouchableOpacity>
     </Modal>
   );
 };

 const styles = StyleSheet.create({
   background: {
     flex: 1,
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
   content: {
     backgroundColor: 'white',
     width: '100%',
     borderTopLeftRadius: 20,
     borderTopRightRadius: 20,
     padding: 20,
     alignItems: 'center', // Centra horizontalmente el contenido
   },
   closeButton: {
     marginTop: 20,
     alignSelf: 'center',
     padding: 10,
     backgroundColor: '#eee',
     borderRadius: 5,
   },
   closeButtonText: {
     fontSize: 16,
     fontWeight: 'bold',
   },
 });

 export default SlidingMenuView;