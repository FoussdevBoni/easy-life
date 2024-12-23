import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';

const screenWidth = Dimensions.get('window').width; // Obtenir la largeur de l'écran

const CategorieItem = ({ navigation, category }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('articles-by-category', { query: category.nom });
      }}
      style={styles.categoryItem}
    >
      <View style={styles.avatar}>
        <Image source={{ uri: category.logo }} style={styles.logo} />
      </View>
      <Text style={styles.categoryName}>{category.nom}</Text>
    </TouchableOpacity>
  );
};

function YCategoriesList({categories}) {
  

  const navigation = useNavigation();


  return (
    <View style={styles.gridContainer}>
      {categories.map((category, index) => (
        <CategorieItem key={index} navigation={navigation} category={category} />
      ))}
    </View>
  );
}

export default YCategoriesList;

const styles = StyleSheet.create({
  horizontalContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permet d'afficher les éléments sur plusieurs lignes
    justifyContent: 'space-between', // Espace uniformément entre les colonnes
    paddingHorizontal: 10,
  },
  categoryItem: {
    width: (screenWidth / 3) - 20, // Taille de chaque élément (1/3 de l'écran, moins les marges)
    marginBottom: 20, // Espace entre les lignes
  },
  categoryName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  avatar: {
    width: '100%', // Largeur de l'avatar à 100% de la taille de la colonne
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
});
