import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


  const SupermarketItem = ({item})=>{
        const navigation = useNavigation()

     return (
       <TouchableOpacity onPress={()=>{
            navigation.navigate('supermarket-details' , {supermarket: item})
        }} style={styles.itemContainer}>
          {/* Icône de cœur en haut à gauche */}
          <Ionicons name="heart" size={20}  style={styles.favoriteIcon} />
          
          {/* Logo centré */}
          <Image source={{ uri: item?.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86JhU0pN_jEd-QJwHepEm4jIQPB2I3c6vLQ&s' }} style={styles.logo} />
          
          {/* Nom du restaurant */}
          <Text style={styles.supermarketName}>{item?.nom}</Text>
        </TouchableOpacity>
     )
  }

const XSupermarketsList = ({supermarkets}) => {

  return (
    <FlatList
      data={supermarkets}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
           <SupermarketItem item={item} key={item.id}/>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#d3d3d3', // Couleur grise
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    position: 'relative', // Nécessaire pour positionner l'icône
  },
  favoriteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  supermarketName: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default XSupermarketsList;
