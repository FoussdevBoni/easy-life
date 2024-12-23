import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import CustomCarousel from './../../../widgets/CustomCarousel';
import BannarItem from '../../../COMMON/items/Client/ProductBannar';
import axios from 'axios';
import { produitsApi } from '../../../../utils/apis';
import { colors } from '../../../../assets/colors/colors';


function Banner({user}) {
 const [plats , setPlats] =useState([])
 useEffect(()=>{
    const getSpecialPlats = async ()=>{
      try {
        const response = await axios.get(produitsApi+'/layouts/restaurant')
        const data = response.data
        console.log(data)
        setPlats(data)
      } catch (error) {
        
      }
    }

    getSpecialPlats()
 },[])
  const renderBannerItem = (item , index) => <BannarItem item={item} user={user} key={index} product={item}/>;
  
  return plats.length>0 ? <CustomCarousel data={plats} renderItem={renderBannerItem} widthRatio={1} heightRatio={0.5}/>: <View>
    <ActivityIndicator color={colors.primary} size={30}/>
  </View>;
}

export default Banner;
