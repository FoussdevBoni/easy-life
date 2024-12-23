import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Pour l'icône de géolocalisation
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({user}) => {
  const navigation = useNavigation()
  const handleNavigate = (route)=>{
    navigation.navigate(route)
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='' />
      {/* Logo avec icône de géolocalisation et texte */}
      <View style={styles.logoContainer}>
        <MaterialIcons name="location-on" size={24} color="#ff7f00" />
        <Text style={styles.logoText}>Easy Life</Text>
      </View>
      
      {/* Texte de bienvenue */}
      <Text style={styles.welcomeText}>Bonjour {user?.nom} !</Text>
      <Text style={styles.subText}>
        Bienvenue dans Easy Life, choisissez votre besoin s'il vous plaît.
      </Text>

      {/* Grille des options */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={()=>{
          handleNavigate('restaurant')
        }}>
          <Image
            source={require('../../../../assets/images/home/resto1.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.optionText}>Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={()=>{
          handleNavigate('logement')
        }}>
          <Image
            source={require('../../../../assets/images/home/hotel1.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.optionText}>Logement</Text>
        </TouchableOpacity>
         <TouchableOpacity style={styles.gridItem} onPress={()=>{
          navigation.navigate('transport')
        }}>
          <Image
           source={require('../../../../assets/images/home/taxi2.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.optionText}>Transport ou Voyage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem} onPress={()=>{
          navigation.navigate('course')
        }}>
          <Image
           source={require('../../../../assets/images/home/market1.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.optionText}>Course ou Pharmacie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff7f00',
    marginLeft: 5,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '75%', 
  },
  gridItem: {
    width: '45%', // Chaque élément prend 45% de la largeur pour permettre deux éléments par ligne
    marginBottom: 20, // Espace entre les lignes
    alignItems: 'center', // Centre le contenu horizontalement
  },
  image: {
    width: '100%', // L'image prend toute la largeur de l'élément
    height: 120, // Hauteur fixée
    borderRadius: 15, // Coins légèrement arrondis
    marginBottom: 10, // Espacement entre l'image et le texte
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
