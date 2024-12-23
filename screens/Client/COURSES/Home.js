import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Pour l'icône de géolocalisation
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../assets/colors/colors';
import { useSelector } from 'react-redux';

const CourseHome = ({user}) => {
   const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='' />
      {/* Logo avec icône de géolocalisation et texte */}
      <View style={styles.logoContainer}>
        <MaterialIcons name="location-on" size={24} color="#ff7f00" />
        <Text style={styles.logoText}>EasyLife Market</Text>
      </View>
      
      {/* Texte de bienvenue */}
      <Text style={styles.welcomeText}>Bonjour {user.nom} !</Text>
      <Text style={styles.subText}>
        Bienvenue dans Easy Life, choisissez votre besoin s'il vous plaît.
      </Text>

      {/* Grille des options */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem} onPress={()=>{
          handleNavigate('supermarket-nav')
        }}>
        
          <Text style={styles.optionText}>Super-marché</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          handleNavigate('pharmacie-nav')
        }} style={styles.gridItem}>
          <Text style={styles.optionText}>Pharmacie</Text>
        </TouchableOpacity>
       
       
      </View>

    </View>
  );
};

const {width , height} = Dimensions.get('screen')

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
    width: '90%',
    marginTop: 100
  },
  gridItem: {
    width: '48%', 
    marginBottom: 20, 
    alignItems: 'center', 
    backgroundColor: colors.secondary,
    height: height*0.3,
    borderRadius: 10,
    justifyContent: 'center'
  },
 
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default CourseHome;
