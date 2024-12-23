import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../assets/colors/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDataByProperty } from '../../../../functions/backend/firebase/getData';

function Pharmacie(props) {
  const {pharmacie} = useRoute().params
  const [categories , setCategories] = useState([])
  const [products , setProducts] = useState([])
  const navigation = useNavigation()

 useEffect(()=>{
   const getCategories = ()=>{
      getDataByProperty('categories' , 'layout' , 'pharmacie' , (data)=>{
        setCategories(data)
      },
      (error)=>{

      }
      
      )
  }

  getCategories()
 } , [pharmacie.id ] )

 useEffect(()=>{
   const getProducts = ()=>{
      getDataByProperty('medicaments' , 'prestataireId' , pharmacie.id , (data)=>{
        setProducts(data)
      },
      (error)=>{

      }
      
      )
  }

  getProducts()
 } , [pharmacie.id ] )

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://www.togofirst.com/media/k2/items/cache/7f1b3d1c32c71f435d32e4e0fe63f6f8_L.jpg' }}
          style={styles.imageHeader}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => {
          navigation.goBack()
        }}>
          <Ionicons name="chevron-back-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Détails du pharmacie */}
      <View style={styles.detailsContainer}>
        <Image
          source={{ uri: pharmacie.profile ||  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq9tnFBDLNRGWgXgViBnIF2KEsW4Tqh7fbuQ&s' }}
          style={styles.pharmacieLogo}
        />
        <Text style={styles.pharmacieName}>
          {pharmacie.nom}
        </Text>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={20} color="black" />
          <Text style={styles.detailText}>
            {pharmacie.adresse}
          </Text>
        </View>
        <View style={styles.infosContainer}>
         
          <View style={styles.timeContainer}>
            <Ionicons name="time" size={30} color={'white'} />
            <Text style={{ color: 'white', marginLeft: 4, fontWeight: '600' }}>25 min</Text>
          </View>
        </View>
      </View>

      {/* Liste des catégories */}
      <ScrollView horizontal style={styles.categoriesList} showsHorizontalScrollIndicator={false}>
         {
          categories.map((category , index)=>(
             <>
              {
                category.nom!=='' && (
                   <TouchableOpacity   onPress={() => {
        navigation.navigate('search-results', { query: category.nom });
      }} key={category.id} style={styles.categoryItem}>
          <Text style={styles.categoryText}>
            {category?.nom}
          </Text>
        </TouchableOpacity>
                )
              }
             </>
          ))
         }
        
      </ScrollView>

      {/* Liste des plats */}
      <ScrollView horizontal style={styles.platsList} showsHorizontalScrollIndicator={false}>
          {
            products.map((item , index)=>(
              <TouchableOpacity key={item.id} style={styles.platItem} onPress={()=>{
                navigation.navigate('medicament-details' , {medicament: item})
              }}>
          <Image
            source={{ uri: item.images[0] || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3RhAkXrDXaU8_tVgEFovixM6eCSLN3CJl5Q&s' }}
            style={styles.platImage}
          />
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {item.prix}
            </Text>
          </View>
        </TouchableOpacity>
            ))
          }
      </ScrollView>
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
  pharmacieLogo: {
    position: 'absolute',
    top: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
  },
  pharmacieName: {
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

export default Pharmacie;
