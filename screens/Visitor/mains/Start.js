import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require('../../../assets/splash.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Optionnel : pour ajouter une superposition de couleur
  },
});
