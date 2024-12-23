import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { getDaata, getDataByMultipleProperties } from '../../../functions/backend/firebase/getData';
import { colors } from '../../../assets/colors/colors';

import { getDistance } from '../../../functions/frontend/getDistance';
import getCurrentAddress from '../../../functions/frontend/getCurrentAdress';
import XSupermarketsList from '../list/XSupermarketsList';
import YPharmmaciesList from '../../PHARMACIE/list/YPharmciesList';
import YSupermarketsList from '../list/YSupermarketsList';

function SupermarketListSection({ adresse, horizontal, user, garde, location }) {
  const [loading, setLoading] = useState(true); 
  const [supermarkets, setSupermarkets] = useState([]);
  const [myCoords, setMyCoords] = useState(null);

  const getMyCoords = async () => {
    try {
      const data = await getCurrentAddress({ user });
      setMyCoords(data?.location);
    } catch (error) {
      console.error('Error getting current address:', error);
    }
  };

  useEffect(() => {
    getMyCoords();
  }, []);

  const getSupermarkets = (data) => {
    const filteredData = data.filter((supermarket) => {
      const matchesLayout = supermarket.layout === 'supermarket';

        const result = getDistance(
          myCoords?.latitude,
          myCoords?.longitude,
          supermarket?.location?.latitude,
          supermarket?.location?.longitude
        );
        const distance = result !== 'quelques' ? parseFloat(result).toFixed(0) : 'quelques';

      const    matchesLocation = location ?  distance <= location || distance==='quelques' : true;

      

      return matchesLayout && matchesLocation;
    });
    
    setSupermarkets(filteredData);
    setLoading(false);
  };

  useEffect(() => {
    const filters = [];

   

      getDaata('prestataires', getSupermarkets, (error) => {
        console.error('Error fetching supermarkets:', error);
      });
    
  }, [adresse, garde, location, myCoords , horizontal]);


  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <>
          {supermarkets.length > 0 ? (
            horizontal ? (
              <XSupermarketsList supermarkets={supermarkets} />
            ) : (  
              <YSupermarketsList supermarkets={supermarkets} />
            )
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Aucune supermarket trouvée</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

export default SupermarketListSection;
