import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { getDaata } from '../../../functions/backend/firebase/getData';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Récupère la largeur de l'écran

const Banner = () => {
  
  
  const [promos , setPromos ]= useState([])
  const [loading , setLoading ]= useState(true)
  const navigation = useNavigation()

  useEffect(()=>{
    const getPromos = (data)=>{
      setLoading(false)
     setPromos(data)
    }

    getDaata('articlesPromos' , getPromos , ()=>{
      setLoading(false)
    })


  } , [])
  



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.bannerContainer} onPress={()=>{
        navigation.navigate("article-details" , {article: item})
      }}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>-{item.discount}%</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
     <>
       {
        loading ? <ActivityIndicator size={30}/> : <>
        
          {
            promos.length >0  ? <View>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={promos}
        scrollAnimationDuration={1000}
        renderItem={renderItem}
        style={styles.carousel}
      />
    
    </View>: null
          }
        </>
       }
     </>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'relative',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  discountContainer: {
    position: 'absolute',
    bottom: 15,
    left: '10%',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    fontWeight: 'bold',
    color: '#E53935',
    fontSize: 16,
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default Banner;
