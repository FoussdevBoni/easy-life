import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { colors } from '../../../assets/colors/colors';
import { useNavigation } from '@react-navigation/native';

const SupermarketItem = ({ item }) => {
          const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.restoItem} onPress={()=>{
         navigation.navigate('supermarket-details' , {supermarket: item})

    }}>
      <Text style={styles.restoName}>{item.nom}</Text>
      <View style={styles.infosContainer}>
        <Image source={{ uri: item?.profile || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86JhU0pN_jEd-QJwHepEm4jIQPB2I3c6vLQ&s' }} style={styles.restoLogo} />
        <View style={styles.restoInfosContainer}>
          <View style={styles.adressContainer}>
            <Ionicons name='location' size={25} color={'white'} />
            <Text style={styles.text}>{item?.adresse}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name='time' size={25} color={'white'} />
            <Text style={styles.text}>{item.disponibilites}</Text>
          </View>
          {/* Ajouter un conteneur pour personnaliser l'arrière-plan du Rating */}
          <View style={styles.ratingBackground}>
            <StarRatingDisplay
             rating={item.note}
             starSize={20}
             color={colors.primary}
             />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function YSupermarketsList({ supermarkets }) {
  return (
      <FlatList
              horizontal={false}
              showsVerticalScrollIndicator={false}
             data={supermarkets}
             renderItem={({ item }) =>  <SupermarketItem key={item.id} item={item} />}
             keyExtractor={(item) => item.id.toString()}
             initialNumToRender={10} 
             maxToRenderPerBatch={10} 
            
            contentContainerStyle={styles.container}

       />
  );
}

export default YSupermarketsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  restoItem: {
    backgroundColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  restoName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infosContainer: {
    flexDirection: 'row',
  },
  restoLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  restoInfosContainer: {
    flex: 1,
    justifyContent: 'center',
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
    marginTop: 5,
    backgroundColor: '#ccc', // Couleur d'arrière-plan personnalisée
    padding: 5,
    borderRadius: 10, // Ajout d'une bordure arrondie
    alignItems: 'center', // Centrer le contenu
  },
  text: {
    marginLeft: 5,
    color: 'black',
  },
});
