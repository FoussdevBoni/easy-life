import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { getDaata, getDataByMultipleProperties } from '../../../functions/backend/firebase/getData';
import MedicamentItem from '../items/MedicamentItem';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../assets/colors/colors';
import { getDistance } from '../../../functions/frontend/getDistance';
import { keywordMatching } from '../../../functions/frontend/keyWordsMatching';




export default function MedicamentsList({ user, vendeurId, categorieId, type, adresse, nom, description , horizontal , note , promo , location}) {
  const [medicaments, setMedicaments] = useState([]);
const [loading , setLoading ] = useState(true)

  const getMedicaments = (data) => {
    setLoading(false)
     const filteredData = data.filter(product => {
      const matchesName = nom ? keywordMatching(product.nom, description) >= 0.2: true;
      const matchesDescription = description ? keywordMatching(product.description, description) >= 0.2 : true;
      return matchesName || matchesDescription;
    });
    setMedicaments(filteredData);
  };

  useEffect(() => {
    const filters = [];
    if (promo) {
      filters.push({ property: 'promo', operator: '==', value: promo });
    }
    if (vendeurId) {
      filters.push({ property: 'prestataireId', operator: '==', value: vendeurId });
    }
    if (categorieId) {
      filters.push({ property: 'categorieId', operator: '==', value: categorieId });
    }
    if (adresse) {
      filters.push({ property: 'adresse', operator: '==', value: adresse });
    }
     if (note) {
      filters.push({ property: 'note', operator: '>', value: note });
    }
    

    

    if (filters.length > 0) {
      getDataByMultipleProperties('medicaments', filters, getMedicaments, (error) => {
        Alert.alert("Erreur" , "Une erreur s'est produite");
      });
    }else{
      getDaata('medicaments' , (data)=>{
        getMedicaments(data)
        setLoading(false)
      } , (error)=>{console.log(error)})
    }
  }, [type, vendeurId, categorieId, adresse, nom, description]); // Ajoutez `nom` et `description` aux dépendances


  return (
      <View >
         {
          loading ? <View style={{flex: 1 , justifyContent: 'center' , alignItems: 'center'}}>
                <ActivityIndicator size={40} color={colors.primary}/>
            </View>:  <View>
                {
                  medicaments.length>0 ? <ScrollView contentContainerStyle={styles.container} horizontal = {horizontal} showsHorizontalScrollIndicator={false}>

        {medicaments.map(
          (
            plat,
            index,
          ) => {
            return (
                <MedicamentItem item={plat} index={plat.id} key={plat.id} user={user}/>
            );
          },
        )}
      </ScrollView>: <View style={{flex: 1 , justifyContent: 'center' , alignItems: 'center'}}>
          <Text style={{marginTop: 20 , opacity: 0.5, fontWeight: '600'}}>
           Désolé! Aucun médicament disponible.
          </Text>
      </View>
     }
    </View>
         }
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  }
});