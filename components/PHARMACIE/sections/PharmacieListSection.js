import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { getDaata, getDataByMultipleProperties } from '../../../functions/backend/firebase/getData';
import { colors } from '../../../assets/colors/colors';
import XPharmaciesList from '../list/XPharmciesList';
import YPharmmaciesList from '../list/YPharmciesList';
import { getDistance } from '../../../functions/frontend/getDistance';
import getCurrentAddress from '../../../functions/frontend/getCurrentAdress';
import { Alert } from 'react-native';

function PharmacieListSection({ adresse, horizontal, user, garde, location }) {
  const [loading, setLoading] = useState(true); 
  const [pharmacies, setPharmacies] = useState([]);
  const [myCoords, setMyCoords] = useState(null);

  const getMyCoords = async () => {
    try {
      const data = await getCurrentAddress({ user });
      setMyCoords(data?.location);
    } catch (error) {
        Alert.alert('Erreur' , "Une erreur s'est produite");
    }
  };

  useEffect(() => {
    getMyCoords();
  }, []);

  const getPharmacies = (data) => {
    const filteredData = data.filter((pharmacie) => {
      const matchesLayout = pharmacie.layout === 'pharmacie';
      let matchesLocation = true;

      if (myCoords && pharmacie?.location) {
        const result = getDistance(
          myCoords.latitude,
          myCoords.longitude,
          pharmacie.location.latitude,
          pharmacie.location.longitude
        );
        const distance = result !== 'quelques' ? parseFloat(result).toFixed(0) : 'quelques';

        matchesLocation = location ?  distance <= location : true;

      }

      return matchesLayout && matchesLocation;
    });

    setPharmacies(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    const filters = [];

    if (adresse) {
      filters.push({ property: 'adresse', operator: '==', value: adresse?.position?.city });
    }

    if (garde) {
      filters.push({ property: 'garde', operator: '==', value: garde });
    }

    if (filters.length > 0) {
      getDataByMultipleProperties('prestataires', filters, getPharmacies, (error) => {
        console.error('Error fetching pharmacies with filters:', error);
      });
    } else {
      getDaata('prestataires', getPharmacies, (error) => {
        console.error('Error fetching pharmacies:', error);
      });
    }
  }, [adresse, garde, location, myCoords]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <>
          {pharmacies.length > 0 ? (
            horizontal ? (
              <XPharmaciesList user={user} pharmacies={pharmacies} />
            ) : (
              
              <YPharmmaciesList user={user} pharmacies={pharmacies} />
            )
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Aucune pharmacie trouvée</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

export default PharmacieListSection;
