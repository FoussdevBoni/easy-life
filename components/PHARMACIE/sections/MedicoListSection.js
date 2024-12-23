import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { getDaata, getDataByMultipleProperties } from '../../../functions/backend/firebase/getData';

import getCurrentAddress from '../../../functions/frontend/getCurrentAdress';
import { getDistance } from '../../../functions/frontend/getDistance';
import { keywordMatching } from '../../../functions/frontend/keyWordsMatching';
import XmedecoList from '../list/XmedecoList';
import YMedicoList from '../list/YMedicoList';

function MedicoListSection({ user, vendeurId, categorieId, nom, description, horizontal, note, location , categorieName }) {

  const [medicaments, setMedicaments] = useState([]);
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

  const getMedicaments = (data) => {
    setLoading(false);
    
    const filteredData = data.filter(product => {
      const matchesName = nom ? keywordMatching(product.nom, nom) >= 0.2 : true;
      const matchesDescription = description ? keywordMatching(product.description, description) >= 0.2 : true;
      const categorieMatches  = categorieName ? product.categorie.nom=== categorieName: true

      let matchesLocation = false;
      if (myCoords && product?.location) {
        const result = getDistance(myCoords.latitude, myCoords.longitude, product.location.latitude, product.location.longitude);
        const distance = result !== 'quelques' ? result.toFixed(0) : 'quelques';

        matchesLocation = location ? distance === 'quelques' || distance <= location : true;
      }

      return matchesName || matchesDescription || matchesLocation || categorieMatches;
    });

    setMedicaments(filteredData);
  };

  useEffect(() => {
    if (!myCoords) return; // Attendre que myCoords soit défini

    const filters = [];
    if (categorieId) {
      filters.push({ property: 'categorieId', operator: '==', value: categorieId });
    }
    if (note) {
      filters.push({ property: 'note', operator: '>', value: note });
    }

    if (filters.length > 0) {
      getDataByMultipleProperties('medicaments', filters, getPlats, (error) => {
        Alert.alert('Erreur' , "Une erreur s'est produite");
      });
    } else {
      getDaata('medicaments', (data) => {
        getMedicaments(data);
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
            <ActivityIndicator size="large" color="#0000ff" />
         </View>
      ) : medicaments.length === 0 ? (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text >Aucun médicament trouvé.</Text> 
         </View> 
      ) : horizontal ? (
        <XmedecoList medicaments={medicaments} />
      ) : (
        <YMedicoList medicaments={medicaments} />
      )}
    </View>
  );
}

export default MedicoListSection;
