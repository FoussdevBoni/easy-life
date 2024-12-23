import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import XCategoriesList from '../list/XCategoriesList';
import { getDaata } from '../../../functions/backend/firebase/getData';
import YCategoriesList from '../list/YCategoriesList';
import { colors } from '../../../assets/colors/colors';

function CategoriesListSection({ horizontal , limite=10 }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  const getCategories = (data) => {
    const filtered = data.filter(item => item.layout === 'supermarket');

    // Filtrer pour supprimer les doublons basés sur le nom de la catégorie
    const uniqueCategories = filtered.filter(
      (item, index, self) => index === self.findIndex((t) => t.nom.trim() === item.nom.trim())
    );

    setCategories(uniqueCategories);
    setLoading(false); // Fin du chargement
  };

  useEffect(() => {
    getDaata('categories', getCategories, (error) => {
      setLoading(false); // En cas d'erreur, on arrête également le chargement
    });
  }, []);


  return (
    <View>
      {loading ? (
        // Affiche l'indicateur de chargement pendant que les données sont récupérées
        <ActivityIndicator size="large" color= {colors.primary} />
      ) : (
        // Affiche la liste des catégories après le chargement
        horizontal ? <XCategoriesList categories={categories} /> : <YCategoriesList categories={categories} />
      )}
    </View>
  );
}

export default CategoriesListSection;
