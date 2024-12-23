import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { colors } from '../../../../assets/colors/colors';
;
import YArticlesList from '../../../../components/SUPERMARKET/list/YArticlesList';

function CoursesFavorites({ user }) {
  const navigation = useNavigation();
  const favorites = useSelector(state => state.favorites.favoritesData);
  const artcles = favorites.filter(item => item.layout === 'supermarket');

  const isFavoritesEmpty = artcles.length === 0;

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
          onPress={() => navigation.goBack()}
        />

        {/* Titre de la page */}
        <View style={styles.infoContainer}>
          <Text style={styles.restaurantName}>Mes favoris</Text>
        </View>
      </Appbar.Header>

      {isFavoritesEmpty ? (
        // Si les favoris sont vides, afficher un message et une icône au centre
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={100} color="#ccc" />
          <Text style={styles.emptyText}>Vous n'avez aucun favori</Text>
        </View>
      ) : (
        // Si les favoris existent, afficher les sections avec les titres

        
          <>
             {artcles.length > 0 && (
            <FlatList 
            data={[{id: 1}]}
            showsVerticalScrollIndicator={false}
            renderItem={()=>(
              <View style={styles.section}>
              <YArticlesList articles={artcles} user={user} />
            </View>
            )}
           />)
           
            }
          </> 
           
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  restaurantName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
});

export default CoursesFavorites;
