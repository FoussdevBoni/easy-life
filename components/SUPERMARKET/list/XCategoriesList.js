import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

// Obtenir la largeur de l'écran pour ajuster la taille des éléments
const screenWidth = Dimensions.get('window').width;

const CategorieItem = ({ navigation, category }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('articles-by-category', { query: category.nom });
      }}
      style={styles.categoryItem}
    >
       {category &&  <View style={styles.avatar}>
        <Image source={{ uri: category.logo }} style={styles.logo} />
      </View>}
      <Text style={styles.categoryName}>{category.nom}</Text>
    </TouchableOpacity>
  );
};

function XCategoriesList({categories}) {
 
  const navigation = useNavigation();

    return (
       <FlatList
         horizontal={true}
         showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => <CategorieItem category={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10} 
        maxToRenderPerBatch={10} 
        windowSize={5} 
      />
    );

}

export default XCategoriesList;

const styles = StyleSheet.create({
  horizontalContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Pour permettre l'affichage en grille
    justifyContent: 'space-between', // Espacement entre les items
    paddingHorizontal: 10,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    width: screenWidth / 3 - 20, // Chaque élément prend un tiers de l'écran
  },
  categoryName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  avatar: {
    width: '100%',
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
