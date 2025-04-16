import React, { FC } from 'react';
 import { View, Text, StyleSheet } from 'react-native';

 interface ProfileInfoRowProps {
   label: string;
   value: string;
 }

 const ProfileInfoRow: FC<ProfileInfoRowProps> = ({ label, value }) => {
   return (
     <View style={styles.container}>
       <Text style={styles.label}>{label}</Text>
       <Text style={styles.value}>{value}</Text>
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     width: '100%',
     marginBottom: 15,
   },
   label: {
     fontSize: 16,
     color: 'gray',
     marginBottom: 5,
     alignSelf: 'flex-start',
   },
   value: {
     fontSize: 16,
     color: 'black',
     alignSelf: 'flex-start',
   },
 });

 export default ProfileInfoRow;