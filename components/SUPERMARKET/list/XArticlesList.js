import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../reducer/cartSlice';


const ArticleItem = ({article , navigation})=>{
   const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cartData);

  
  const existingItemCart = cart.find((item) => item.id === article.id);

  const dispatch = useDispatch();

  const addToCart = () => {
    if (existingItemCart) {
      const updatedCart = cart.map((item) =>
        item.id === article.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      dispatch(setCart(updatedCart));
    } else {
      dispatch(setCart([...cart, { ...article, quantity: 1 }]));
    }

  };

  return (
     <TouchableOpacity key={article?.id} onPress={()=>{
          navigation.navigate("article-details" , {article})
        }} style={styles.dishContainer}>
          {/* Image en haut couvrant 50% du container */}
          <Image source={{ uri: article.images[0] }} style={styles.dishImage} />

          {/* Contenu en bas (nom, temps de livraison, prix) */}
          <View style={styles.bottomContent}>
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{article.nom}</Text>
              <Text style={styles.deliveryTime}> {article.tempsLivraison || "Quelques minutes"} </Text>
              <Text style={styles.price}>{article.prix} F CFA/{article.unity || 'unité'}</Text>
            </View>

            {/* Bouton Add en bas à droite avec icône */}
            {
              !existingItemCart &&  <TouchableOpacity onPress={()=>{
                addToCart()
              }} style={styles.addButton}>
              <Ionicons name="add-circle-outline" size={30} color="black" />
            </TouchableOpacity>
            }
          </View>
        </TouchableOpacity>
  )
}

function XArticlesList({articles}) {
 

  const navigation = useNavigation();



  return (
   <FlatList
   horizontal={true}
   showsHorizontalScrollIndicator={false}
  data={articles}
  renderItem={({ item }) => <ArticleItem article={item} navigation={navigation} />}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={styles.container}
  initialNumToRender={10} 
  maxToRenderPerBatch={10} 
  windowSize={5} 
/>
  );
}

export default XArticlesList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  dishContainer: {
    width: 200, // Largeur du conteneur pour chaque article
    height: 250, // Hauteur du conteneur pour chaque article
    backgroundColor: 'white', // Fond gris
    borderRadius: 10,
    marginRight: 20, // Espacement entre les éléments de la liste
    overflow: 'hidden', // Pour que l'image ne dépasse pas des coins arrondis
    position: 'relative',
  },
  dishImage: {
    width: '100%',
    height: '50%', // L'image prend 50% de la hauteur du container
    resizeMode: 'cover', // Couvre l'espace disponible
  },
  bottomContent: {
    flexDirection: 'row', // Contenu en ligne
    justifyContent: 'space-between', // Séparation entre texte à gauche et bouton à droite
    padding: 10,
    height: '50%', // Le contenu occupe le reste du container
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start', // Aligne le texte à gauche
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});
