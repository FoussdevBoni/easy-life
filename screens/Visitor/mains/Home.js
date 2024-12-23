import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { colors } from '../../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
    const  navigation = useNavigation()

  return (
    <View style={styles.container}>
      <StatusBar  style='light'/>
      {/* Image de fond */}
      <ImageBackground 
        source={require('../../../assets/landing-bg.png')} 
        resizeMode="contain" // Image de fond occupe toute la hauteur
        style={styles.backgroundImage}
      >
        {/* Couche semi-transparente */}
        <View style={styles.overlay} />

        {/* Contenu sur l'image */}
        <View style={styles.contentContainer}>
          {/* Header complètement en haut */}
          <View style={styles.header}>
             <View style={{flexDirection: 'row'}}>
              <View style={{marginTop: 8}}>
                <Image source={require('../../../assets/images/location-icon.png')} style={{width: 30 , height: 30}}/>
              </View>
              <Text style={styles.logoText}>Easy Life</Text>
             </View>
            <Text style={styles.tagline}>La vie facile</Text>
          </View>

          {/* Partie texte de bienvenue et boutons en bas */}
          <View style={styles.bottomContainer}>
            <View style={styles.welcomeTextContainer}>
               <Text style={styles.welcomeText}>
                 Bienvenue dans notre application ! 
               </Text>
               <View style={{height: 4}}/>
              <Text style={styles.welcomeText}>
               Nous sommes ravis de vous avoir à bord. Découvrez toutes les fonctionnalités pratiques et agréables que Easy Life a à vous offrir. N’hésitez pas à explorer les différents services.
              </Text>
            </View>

            {/* Boutons */}
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>{
                navigation.navigate('register')
              }}>              
                <Text style={styles.buttonText}>INSCRIPTION</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{
                navigation.navigate('login')
              }}>
                <Text style={styles.buttonText}>CONNEXION</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(3, 192, 74, 0.5)', // Couche semi-transparente
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Espacer les sections
  },
  header: {
    alignItems: 'center',
    marginTop: 50, // Ajuste la marge pour que le header soit en haut
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  tagline: {
    fontSize: 16,
    color: 'black',
    fontWeight: '900',
    textAlign: 'right',
    marginLeft: 150
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 50, // Ajuste pour coller les éléments en bas
  },
  welcomeTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonContainer: {
    width: width * 0.85,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
