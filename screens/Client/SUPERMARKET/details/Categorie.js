import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import ArticlesListSection from '../../../../components/SUPERMARKET/sections/ArticlesListSection';

function Categorie({user}) {
 const {category} = useRoute().params

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWeECgpU7ndozaDY-cS3QKLjvSL7stKvYsOQ&s' }}
          style={styles.imageHeader}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => {}}>
          <Ionicons name="chevron-back-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Détails du restaurant */}
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: category.logo ||  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq9tnFBDLNRGWgXgViBnIF2KEsW4Tqh7fbuQ&s' }}
          style={styles.restaurantLogo}
        />
        <Text style={styles.restaurantName}>
          {category.nom}
        </Text>
       
        
      </View>

      
      <ArticlesListSection user={user} horizontal={true} categorieId={category.id} />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    position: 'relative',
    height: 200,
    padding: 10,
    marginTop: 30,
  },
  imageHeader: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  detailsContainer: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    backgroundColor: '#CCC',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: '40%',
  },
  restaurantLogo: {
    position: 'absolute',
    top: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
  },
  infosContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  timeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 25,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  categoriesList: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 35, // Réduction de la hauteur
    marginTop: 250,
  },
  categoryItem: {
    backgroundColor: '#CCC',
    borderRadius: 20,
    paddingVertical: 5, // Taille réduite
    paddingHorizontal: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35, // Taille plus petite pour un rendu professionnel
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  platsList: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  platItem: {
    position: 'relative',
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  platImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  priceContainer: {
    position: 'absolute',
    bottom: 30,
    left: '20%',
     right: '20%',
    backgroundColor: '#ccc',
     borderRadius: 20,
    padding: 5, // Taille plus petite
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Categorie;
