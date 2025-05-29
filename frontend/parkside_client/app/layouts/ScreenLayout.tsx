import React, { FC, ReactNode } from 'react';
 import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
 import BackButton from '../../components/common/BackButton';

 interface ScreenLayoutProps {
   title: string;
   navigation: any;
   children: ReactNode;
 }

 const ScreenLayout: FC<ScreenLayoutProps> = ({ title, navigation, children }) => {
   const handleGoBack = () => {
     navigation.goBack();
   };

   return (
     <SafeAreaView style={styles.safeArea}>
       <View style={styles.header}>
         <BackButton onPress={handleGoBack} />
         <Text style={styles.title}>{title}</Text>
       </View>
       <View style={styles.container}>
           {children}
       </View>
     </SafeAreaView>
   );
 };

 const styles = StyleSheet.create({
   safeArea: {
     flex: 1,
     backgroundColor: '#F0F8FF', // Fondo celeste claro (ajusta si es necesario)
   },
   header: {
     flexDirection: 'row',
     alignItems: 'center',
     paddingHorizontal: 16,
     paddingVertical: 10,
     borderBottomWidth: 1,
     borderBottomColor: '#ddd',
   },
   title: {
     fontSize: 22,
     fontWeight: 'bold',
     color: 'black',
     marginLeft: 20,
   },
   container: {
     flex: 1,
     padding: 20,
   },
 });

 export default ScreenLayout;