import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import { colors } from '../../../assets/colors/colors';
import { getDataById } from '../../../functions/backend/firebase/getData';


const CommandeItem = ({ commande , navigation , selected }) => {
     const [product , setProduct] = useState(null)
      
      const getProduct = async ()=>{
        const data = await getDataById('medicaments' , commande.produitId)
        setProduct(data)
      }
    useEffect(()=>{
       getProduct()

    } , [])

    return (
   <View style={selected ? styles.selectedStyle : styles.mealItem}>
       { product && <Image source={{uri: product?.images[0]}} style={styles.image} />}

    <View style={styles.mealInfo}>
      <Text style={styles.title}>{product?.nom}</Text>
      <Text style={styles.description}>{product?.prix*commande?.quantite} F CFA</Text>
      <Text style={styles.price}>{commande?.statut ? commande?.statut : 'En attente'}</Text>
    </View>
  </View>
 
);
}



const styles = StyleSheet.create({
 
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mealItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 5
  },
  selectedStyle: {
     flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 5,
    opacity: 0.7
  },
  mealInfo: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    height: 150,
    resizeMode: 'contain',
  },
});

export default CommandeItem;
