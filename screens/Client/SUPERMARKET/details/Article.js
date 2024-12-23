import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setFavorites } from '../../../../reducer/favoritesSlice';
import { setCart } from '../../../../reducer/cartSlice';
import { colors } from '../../../../assets/colors/colors';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { getDataByProperty } from '../../../../functions/backend/firebase/getData';
import { updateData } from '../../../../functions/backend/firebase/updateData';
import { setRateds } from '../../../../reducer/ratedSlice';

const Article = () => {
 const route =useRoute()
  const {article} = route.params
  const cartRedux = useSelector((state) => state.cart.cartData)
  const cart = cartRedux.filter(item=>(item.layout==='supermarket'));
  const favorites = useSelector((state) => state.favorites.favoritesData);
  const rateds = useSelector((state)=>state.rated.ratedsData)

  const rated = rateds.find(item=>item.id===article.id)

    const [showSnackBar, setShowSnackBar] = useState(false); // Pour afficher un feedback visuel
    const [message , setMessage] = useState('')
   const existingItemFavorite = favorites.find((item) => item.id === article.id);
       const existingItemCart = cart.find((item) => item.id === article.id);

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
        item.id === article.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      dispatch(setCart(updatedCart));
      navigation.navigate("cart")
    } else {
      dispatch(setCart([...cart, { ...article, quantity }]));
     
      


    }

    setShowSnackBar(true); 
    setMessage('Article ajouté au panier')
  };


  const likeArticle = () => {

  if (!existingItemFavorite) {
      dispatch(setFavorites([...favorites , article]));
    setShowSnackBar(true); 
        setMessage("Ce article a été ajouté à vos favoris !");

  }else{
    
    const updatedFavorites = favorites.filter((item) => item.id !== article.id);
    dispatch(setFavorites(updatedFavorites)); 
    setMessage("Ce article a été retiré de vos favoris !");
    setShowSnackBar(true);
  }
  };



  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(rated?.value || 0);



  const handleRating = (star) => {
    setRating(star)
    dispatch(setRateds([...rateds , {value: star , id: article.id}]))
    
    const currentNote = article.note || 0
     const newNote = Math.min(5, (currentNote + star) / 5);

    updateData('articles' , article.id , {
      ...article , note: newNote
    } , ()=>{
      Alert.alert("Succès" , "Merci beaucoup pour votre avis")

    } , 
    (error)=>{
       Alert("Erreur" , "Une erreur s'est produite")
    }
    )
  };

  const [similarDishes , setSimilarDishes] = useState([])
  const [superMarketArticles , setSuperMarketArticles] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    const getSimilarArticle = ()=>{
        getDataByProperty("articles" ,"categorieId" , article.categorieId ,  (data)=>{
           setSimilarDishes(data)
           setLoading(false)
        } , (error)=>{
           setLoading(false)
            console.log("error" , error)
        })
    }

    const getSuperMarketArticles = ()=>{
       getDataByProperty("articles" ,"prestataireId" , article.prestataireId ,  (data)=>{
           setSuperMarketArticles(data)
          setLoading(false)
        } , (error)=>{
           setLoading(false)
            console.log("error" , error)
        })
    }

    getSimilarArticle()
    getSuperMarketArticles()

  } , [])

  return (
     <View style={{flex: 1}}>
          <Appbar.Header style={styles.header}>
        <StatusBar style="light" backgroundColor={colors.primary} />

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
            {article.prestataireName}
          </Text>
          <Text style={styles.locationText}>
            {article.adresse}
          </Text>
        </View>

        {/* Icône de notification */}
        <View style={styles.notificationContainer}>
          <Appbar.Action icon="heart" onPress={() => {
            likeArticle()
          }} color={existingItemFavorite ? 'red': "white"} />
        </View>
      </Appbar.Header>

        <ScrollView style={styles.container}>
      {/* Dish Image */}
      <TouchableOpacity style={styles.imageWrapper}>
        <Image
          source={{ uri: article.images[0] || 'https://via.placeholder.com/350x200' }}
          style={styles.image}
        />
      </TouchableOpacity>

      {/* Dish Name and Price */}
      <Text style={styles.dishName}>
        {article.nom}
      </Text>
      <Text style={styles.price}>{article.prix} F CFA</Text>

      {/* Ratings */}
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
            <Ionicons
              name={index < rating ? 'star' : 'star-outline'}
              size={24}
              color={index < rating ? '#F5A623' : '#ccc'}
            />
          </TouchableOpacity>
        ))}
        <Text style={styles.ratingText}>({rating}/5)</Text>
      </View>

      {/* Delivery Time */}
      <View style={styles.deliveryContainer}>
        <Ionicons name="time-outline" size={20} color="#000" />
        <Text style={styles.deliveryText}>30 - 40 minutes</Text>
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={handleSubtract} style={styles.quantityButton}>
          <Ionicons name="remove-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={handleAdd} style={styles.quantityButton}>
          <Ionicons name="add-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        {article.description}
      </Text>

      {/* Add to Cart Button */}
      <TouchableOpacity onPress={()=>{
        addToCart()
        
      }} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>
          {!existingItemCart ? "Ajouter au panier": "Voir le panier"}
        </Text>
      </TouchableOpacity>

      {/* Similar Dishes */}
        <>
         {loading ? <View style={{justifyContent: 'center' , alignItems: 'center'}}>
          <ActivityIndicator size={25} />
         </View> : <>
         
           <Text style={styles.sectionTitle}>Articles similaires</Text>
      <FlatList
        horizontal
        data={similarDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
            navigation.navigate("article-details" , {article: item})
          }} style={styles.similarDish}>
            <Image source={{ uri: item.images[0] }} style={styles.similarDishImage} />
            <Text style={styles.similarDishName}>{item.nom}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>
        {article.prestataireName} propose aussi
      </Text>
      <FlatList
        horizontal
        data={superMarketArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{
             navigation.navigate("article-details" , {article: item})
          }} style={styles.similarDish}>
            <Image source={{ uri: item.images[0] }} style={styles.similarDishImage} />
            <Text style={styles.similarDishName}>{item.nom}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
         </>
         
         }
        
        </>
    </ScrollView>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  
  header: {
    backgroundColor: colors.primary,
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
  imageWrapper: {
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  dishName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  deliveryText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  similarDish: {
    alignItems: 'center',
    marginRight: 15,
  },
  similarDishImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  similarDishName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
});

export default Article;
