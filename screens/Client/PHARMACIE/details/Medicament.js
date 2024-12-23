import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Paragraph, Snackbar, Title } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../../../assets/colors/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../../reducer/cartSlice';
import { setFavorites } from '../../../../reducer/favoritesSlice';

function Medicament({user}) {
  const route =useRoute()
  const {medicament} = route.params
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart.cartData);
  const favorites = useSelector((state) => state.favorites.favoritesData);
    const [showSnackBar, setShowSnackBar] = useState(false); // Pour afficher un feedback visuel
    const [message , setMessage] = useState('')
   const existingItemFavorite = favorites.find((item) => item.id === medicament.id);
       const existingItemCart = cart.find((item) => item.id === medicament.id);

   const navigation = useNavigation()
  const dispatch = useDispatch()
 const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    if (existingItemCart) {
      const updatedCart = cart.map((item) =>
        item.id === medicament.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      dispatch(setCart(updatedCart));
    } else {
      dispatch(setCart([...cart, { ...medicament, quantity }]));
    }
    setShowSnackBar(true); 
    setMessage('Medicament ajouté au panier')
  };

  const likeMedicament = () => {

  if (!existingItemFavorite) {
      dispatch(setFavorites([...favorites , medicament]));
    setShowSnackBar(true); 
        setMessage("Ce medicament a été ajouté à vos favoris !");

  }else{
    
    const updatedFavorites = favorites.filter((item) => item.id !== medicament.id);
    dispatch(setFavorites(updatedFavorites)); 
    setMessage("Ce medicament a été retiré de vos favoris !");
    setShowSnackBar(true);
  }
  };


  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <StatusBar style="light" backgroundColor={colors.secondary} />

        {/* Bouton retour */}
        <Appbar.Action
          icon={() => (
            <Ionicons
              style={{ marginTop: -4, marginLeft: -7 }}
              size={30}
              name="chevron-back-circle"
              color="white"
            />
          )}
          onPress={() => {
            navigation.goBack()
          }}
        />

        {/* Informations du vendeur */}
        <View style={styles.infoContainer}>
          <Text style={styles.sellerName}>
            {medicament.prestataireName}
          </Text>
          <Text style={styles.locationText}>
            {medicament.adresse}
          </Text>
        </View>

        {/* Icône de notification */}
        <View style={styles.notificationContainer}>
          <Appbar.Action icon="heart" onPress={() => {
            likeMedicament()
          }} color={existingItemFavorite ? 'red': "white"} />
        </View>
      </Appbar.Header>

      {/* Corps */}
      <View style={styles.body}>
        {/* Image de l'medicament */}
        <View style={styles.medicamentImageContainer}>
          <Image
            source={{ uri: medicament.images[0] }} // Remplacer par l'URL réelle de l'image de l'medicament
            style={styles.image}
          />
        </View>

        {/* Conteneur de texte */}
        <View style={styles.textContainer}>

          {/* Nom et prix */}
          <View style={styles.name}>
            <Text style={styles.titleText}>
              {medicament.nom}
            </Text>
          </View>

          {/* Prix et quantité */}
          <View style={styles.priceAndQuantityContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>{medicament.prix} FCFA</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleSubtract} style={styles.quantityButton}>
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={handleAdd} style={styles.quantityButton}>
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Détails de l'medicament */}
          <View style={styles.detailsContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={35} color={colors.primary} />
            </View>
            <View style={styles.timeContainer}>
              <Ionicons name="time" size={30} color={'white'} />
              <Text style={{color: 'white' , marginLeft: 4 , fontWeight: '600'}}> {medicament.livraisonTime}</Text>
            </View>
          </View>

          {/* Section "À propos" */}
          <View >
            <Title style={styles.aboutTitle}>À propos</Title>
             <ScrollView style={styles.aboutContainer}>
               <Paragraph style={styles.description}>
             {medicament.description}
            </Paragraph>
             </ScrollView>
          </View>

          {/* Bouton d'ajout au panier */}
          <View style={styles.addToCartContainer}>
            <TouchableOpacity style={styles.addButton} onPress={()=>{
              if (existingItemCart) {
                 navigation.navigate('cart')
              }else {
                 addToCart()
              }
            }}>
              <Text style={styles.addButtonText}>
                {
                  existingItemCart ? "Voir votre panier": "Ajouter au panier"
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        {/* Snackbar pour un retour visuel */}
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        duration={3000}
      >
       {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: colors.secondary,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  sellerName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
  },
  medicamentImageContainer: {
    position: 'absolute',
    top: 100,
    left: '50%',
    zIndex: 500,
    transform: [{ translateX: -90 }], // Maintient l'image centrée
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  textContainer: {
    flex: 1,
    marginTop: 180, // Crée de l'espace pour éviter le chevauchement avec l'image
    backgroundColor: 'gray',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingTop: 120, // Ajuste l'espacement intérieur pour laisser de la place à l'image flottante
  },
  name: {
    marginBottom: 0,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  priceAndQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceContainer: {
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 18,
    color: '#FFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -25,
    backgroundColor: colors.secondary,
    borderRadius: 20,
  },
  quantityButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  quantityText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#FFF',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  timeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 25,
  },
  aboutContainer: {
    marginTop: 10,
   height: 120

  },
  aboutTitle: {
    color: '#FFF',
  },
  description: {
    color: '#DDD',
  },
  addToCartContainer: {
    alignItems: 'center',
    marginBottom: 3,
    alignSelf: 'stretch',
  },
  addButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});



export default Medicament;
