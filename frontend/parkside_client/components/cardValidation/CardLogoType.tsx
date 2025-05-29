import React, { FC } from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface CardLogoProps {
  cardType: 'visa' | 'mastercard';
}

const CardLogo: FC<CardLogoProps> = ({ cardType }) => {
  let logoSource;

  if (cardType === 'visa') {
    logoSource = require('../../assets/images/visa.jpeg');
  } else if (cardType === 'mastercard') {
    logoSource = require('../../assets/images/mastercard.jpeg');
  } else {
    return null; // No mostrar nada si no es ninguno de los tipos esperados
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
