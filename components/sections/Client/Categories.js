import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getDaata } from '../../../functions/backend/firebase/getData';

function Categories({ layout, prestataireId }) {
  const [categories, setCategories] = useState([]);

  const getCategories = (data) => {
    let filtered = data;
    if (layout) {
      filtered = filtered.filter((item) => item.layout === layout);
    }
    if (prestataireId && layout) {
      filtered = filtered.filter((item) => item.prestataireId === prestataireId);
    }

    // Filtrer pour supprimer les doublons basés sur le nom de la catégorie
    const uniqueCategories = filtered.filter(
      (item, index, self) => index === self.findIndex((t) => t.nom.trim() === item.nom.trim())
    );

    setCategories(uniqueCategories);
    uniqueCategories.map((item)=>{
        console.log(item.nom)
    })
    console.log('uniqueCategories' , uniqueCategories)
  };

  useEffect(() => {
    getDaata('categories', getCategories, (error) => {
      console.log(error);
    });
  }, [layout]);

  const navigation = useNavigation();

  return (
    <ScrollView horizontal contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('category-details', { category });
          }}
          style={styles.categoryItem}
        >
          <View style={styles.avatar}>
            <Image source={{ uri: category.logo }} style={styles.logo} />
          </View>
          <Text style={styles.categoryName}>{category.nom}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default Categories;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 35,
  },
});
