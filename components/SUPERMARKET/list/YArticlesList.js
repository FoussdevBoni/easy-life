import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import CustomRating from '../../widgets/CustomRating';
import { useNavigation } from '@react-navigation/native';

const ArticleItem = ({ item }) => {
  const navigation =useNavigation()
   if (item) {
     return (
    <TouchableOpacity style={styles.articleItem} onPress={()=>{
      navigation.navigate('article-details' , {article: item})
    }}>
      <Text style={styles.articleName}>{item.nom}</Text>
      <View style={styles.infosContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.articleImage} />
        <View style={styles.articleInfosContainer}>
          <View style={styles.adressContainer}>
            <Ionicons name='location' size={25} color={'black'} />
            <Text style={styles.text}>{item.adresse}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Ionicons name='time' size={25} color={'black'} />
            <Text style={styles.text}>{item.livraisonTime || 'quelques minutes'}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{`${item.prix} F CFA/${item.unity || 'unité'}`}</Text>
          </View>
          <View style={styles.ratingBackground}>
            <CustomRating maxRating={5} onRatingChange={(rating) => console.log('Rating selected:', rating)} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
   }
};

function YArticlesList({ articles }) {
  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

export default YArticlesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  articleItem: {
    backgroundColor: '#eee ',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  articleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infosContainer: {
    flexDirection: 'row',
  },
  articleImage: {
    width: 130,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  articleInfosContainer: {
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
  priceContainer: { // Nouveau style pour le prix
    marginTop: 5,
    marginBottom: 10,
  },
  priceText: { // Style du texte du prix
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  ratingBackground: {
    marginTop: 5,
    borderRadius: 10,
  },
  text: {
    marginLeft: 5,
    color: 'black',
  },
});
