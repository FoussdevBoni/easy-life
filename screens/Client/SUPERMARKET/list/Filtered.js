import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import getCurrentAddress from '../../../../functions/frontend/getCurrentAdress';
import StackAppbar from '../../../../components/RESTAURANTS/sections/StackAppBar';
import { colors } from '../../../../assets/colors/colors';

import LogementsList from '../../../../components/LOGEMENTS/list/XLogementsList';
import ArticlesList from '../../../../components/SUPERMARKET/list/ArticlesList';

function ArticlesFiltered({user}) {
    const route = useRoute()
    const {filtered} =  route.params

    const [address, setAddress] = useState({
    ville: '',
    pays: '',
    location: null,
  });
  const [loading, setLoading] = useState(false);
const navigation = useNavigation()
  const fetchAddress = async () => {
    setLoading(true);
    
    const addressData = await getCurrentAddress({user});
    setAddress(addressData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

    return (
        <>
          <StackAppbar goBack={navigation.goBack} title={filtered.sort} styles={{bgColor: colors.primary , textColor: 'white'}} />

          {
            filtered.id === "1" &&  (
                <ArticlesList user={user} promo={true} adresse={address.ville}  />
            )
          }
          
          {
            filtered.id === "2" &&  (
                <ArticlesList user={user} adresse={address.ville}  />
            )
          }
          
           {
            filtered.id === "3" &&  (
                <ArticlesList user={user} adresse={address.ville} note={3}  />
            )
          }
          
           {
            filtered.id === "4" &&  (
                <ArticlesList user={user} adresse={address.ville}  />
            )
          }


           
        </>
    );
}

export default ArticlesFiltered;