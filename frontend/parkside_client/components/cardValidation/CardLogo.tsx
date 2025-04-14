import React, { FC } from 'react';
 import { View, Image, StyleSheet } from 'react-native';

 interface CardLogoProps {
   cardNumber: string;
 }

 const CardLogo: FC<CardLogoProps> = ({ cardNumber }) => {
   const visaRegex = /^4/;
   const mastercardRegex = /^5[1-5]/;

   let logoSource = null;
   if (visaRegex.test(cardNumber)) {
     logoSource = require('../../assets/images/visa.jpeg'); // Asegúrate de tener estos assets
   } else if (mastercardRegex.test(cardNumber)) {
     logoSource = require('../../assets/images/mastercard.jpeg'); // Asegúrate de tener estos assets
   }

   if (!logoSource) {
     return null; // No mostrar logo si no se reconoce la tarjeta
   }

   return (
     <View style={styles.container}>
       <Image source={logoSource} style={styles.logo} resizeMode="contain" />
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     marginLeft: 10,
   },
   logo: {
     width: 50,
     height: 30,
   },
 });

 export default CardLogo;