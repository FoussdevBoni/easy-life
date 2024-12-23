import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../../assets/colors/colors';
import CustomCarousel from '../../../widgets/CustomCarousel';
import ArticleBannarItem from '../../../COMMON/items/Client/ArticleCarouselItem';
import getDataById from '../../../../functions/backend/get/getData';
import { produitsApi } from '../../../../utils/apis';


function PharmaHomeBanner({user , vendeurId}) {
   const [products , setProducts] = useState([])
  useEffect(()=>{
    getDataById(produitsApi+'/layouts/supermarket' , (data)=>{
        const filtered = data.filter((item)=>(item.note===undefined))
        if (filtered.length>3) {
            setProducts(filtered)
        }else {
          const filtered = data.filter((item)=>(item.note>3.5))
          setProducts(filtered)

        }
    })
  } ,[])
  const renderBannerItem = (item , index) => <ArticleBannarItem item={item} user={user} key={index}/>;
  
  return products.length>0 ? <CustomCarousel autoPlay={true} data={products} renderItem={renderBannerItem} widthRatio={1} heightRatio={0.5}/>: <View>
    <ActivityIndicator color={colors.primary} size={30}/>
  </View>;
}

export default PharmaHomeBanner;
