import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getDaata, getDataByMultipleProperties } from '../../../functions/backend/firebase/getData';

import getCurrentAddress from '../../../functions/frontend/getCurrentAdress';
import { getDistance } from '../../../functions/frontend/getDistance';
import { keywordMatching } from '../../../functions/frontend/keyWordsMatching';
import XArticlesList from '../list/XArticlesList';
import YArticlesList from '../list/YArticlesList';
import { Alert } from 'react-native';
import { colors } from '../../../data/styles/colors';
import { orderedData } from '../../../functions/backend/firebase/orderData';
import { updateData } from '../../../functions/backend/firebase/updateData';

function ArticlesListSection({ user, vendeurId, categorieId, nom, description, horizontal, note, location , categorieName , orderBy }) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myCoords, setMyCoords] = useState(null);

  const getMyCoords = async () => {
    const data = await getCurrentAddress({ user });
    const location = data?.location;
    setMyCoords(location);
  };

  useEffect(() => {
    getMyCoords();
  }, []);

  const getArticles = (data) => {

   
    setLoading(false);
    
    const filteredData = data.filter(product => {
      const matchesName = nom ? keywordMatching(product.nom, nom) >= 0.5 : true;
      const matchesDescription = description ? keywordMatching(product.description, description) >= 0.5 : true;
      const categorieMatches  = categorieName ? product.categorie?.nom=== categorieName: true
      
   
      

      return (matchesName || matchesDescription )&& categorieMatches;
    });

    setArticles(filteredData);
  };

  useEffect(() => {

 
   

    if (orderBy) {
      orderedData('articles', orderBy, 'desc' , getArticles, (error) => {
        Alert.alert('Erreur' , "Une erreur s'est produite");
      });
    } else {
      getDaata('articles', (data) => {
        getArticles(data);
        setLoading(false);
      }, (error) => {
        Alert.alert('Erreur' , "Une erreur s'est produite");
      });
    }


  }, [vendeurId, categorieId, location, nom, description, note, myCoords]);

  return (
    <View >
      {loading ? (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
         </View>
      ) : articles.length === 0 ? (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text >Aucun article trouvé.</Text> 
         </View> 
      ) : horizontal ? (
        <XArticlesList articles={articles} />
      ) : (
        <YArticlesList articles={articles} />
      )}
    </View>
  );
}

export default ArticlesListSection;
