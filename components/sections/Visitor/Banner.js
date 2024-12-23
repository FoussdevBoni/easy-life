import React from 'react';
import CustomCarousel from '../../widgets/CustomCarousel';
import BannerItem from '../../COMMON/items/Visitor/BannerItem';
import { Text } from 'react-native';
import { colors } from '../../../assets/colors/colors';


function Banner() {
   const items = [
    {
      paragraph: 'Avec EASY LIFE , simplifie votre vie quotidienne ',
      title: <>Bienvenu sur <Text style={{color: colors.primary}}>EASY-LIFE</Text></> , 

    },
     {
      paragraph: 'Découvrez les vendeurs de vos articles préférés , proches de chez vous et commander en toute sécurité',
      title: 'Achat de super-marché' , 

    },
     {
      paragraph: "Commander vos plats depuis chez vous et vous serai servir en un moins de temps",
      title: 'Service de restauration' , 
    },
     {
      paragraph: "Rechercher les hôtels sans difficultés et réserver votre chambre sans se déplacer",
      title: 'Service de logement' , 
    },
     {
      paragraph: "Avec EASY-LIFE , rechercher facilement un taxi pour vos parcours quotidiens",
      title: 'Service de transport' , 
    },
   ]

  const renderBannerItem = (item , index) => <BannerItem item={item}  key={index}/>;
  
  return <CustomCarousel data={items} renderItem={renderBannerItem} widthRatio={1} heightRatio={0.6} autoPlay={false}/>;
}

export default Banner;
