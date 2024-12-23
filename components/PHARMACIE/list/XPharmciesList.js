import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { FlatList } from 'react-native-gesture-handler';
import CustomRating from '../../widgets/CustomRating';
import getCurrentAddress from '../../../functions/frontend/getCurrentAdress';
import { getDistance } from '../../../functions/frontend/getDistance';
import { useNavigation } from '@react-navigation/native';

const PharmacieItem = ({ item  , user}) => {
    const navigation = useNavigation()
       const [myCoords , setMyCoords] = useState(null)
   const getMyCoords = async ()=>{
      const data = await getCurrentAddress({user})
      const location = data?.location
      setMyCoords(location)
   }
  useEffect(()=>{
    getMyCoords()
  } , [])

        const result = getDistance(myCoords?.latitude , myCoords?.longitude , item?.location?.latitude , item?.location?.longitude)
        const distance = result!=='quelques' ? result.toFixed(0) : 'quelques'
  return (
    <TouchableOpacity style={styles.pharmacieItem} onPress={()=>{
      navigation.navigate("pharmacie" , {pharmacie: item})
    }}>
      <Text style={styles.pharmacieName}>{item.nom}</Text>
      <View style={styles.infosContainer}>
        <Image source={{ uri: item.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86JhU0pN_jEd-QJwHepEm4jIQPB2I3c6vLQ&s' }} style={styles.pharmacieLogo} />
        <View style={styles.pharmacieInfosContainer}>
          <View style={styles.adressContainer}>
            <Ionicons name='location' size={20} color={'#333'} />
            <Text style={styles.text}>{item.adresse}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name='time' size={20} color={'#333'} />
            <Text style={styles.text}>
                {distance} km
            </Text>
          </View>
        
        </View>
      </View>
    </TouchableOpacity>
  );
};

function XPharmaciesList({ pharmacies , user }) {
  return (
    <FlatList
      horizontal
      data={pharmacies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PharmacieItem item={item} user={user}/>}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false} 
    />
  );
}

export default XPharmaciesList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  pharmacieItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginRight: 15,
    borderRadius: 7,
    width: 250, // Largeur fixe pour chaque item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Pour Android
  },
  pharmacieName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infosContainer: {
    flexDirection: 'row',
  },
  pharmacieLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  pharmacieInfosContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  adressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingBackground: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
});
