import React, { FC, ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

interface MainMenuLayoutProps {
  children: ReactNode;
}

const MainMenuLayout: FC<MainMenuLayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Color de fondo
  },
  container: {
    flex: 1,
    padding: 24,
  },
});

export default MainMenuLayout;