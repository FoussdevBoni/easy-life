import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ReviewList from '../../COMMON/list/AvisList';
import getDataById from '../../../functions/backend/get/getData';
import { avisApi } from '../../../utils/apis';
import { getDaata, getDataByProperty } from '../../../functions/backend/firebase/getData';

const Avis = ({produitId , prestataireId , user}) => {

  const [ reviews , setReviews] = useState([])

  useEffect(()=>{
          console.log('produitId' , produitId)

    if (produitId) {
      console.log('produitId' , produitId)
      getDataByProperty('avis' , 'produitId' , produitId , (data)=>{setReviews(data) ; console.log(data) } , (error)=>{console.log(error)})

    }else if (prestataireId) {
       getDataByProperty('avis' , 'prestataireId' , prestataireId , (data)=>{setReviews(data) ; console.log(data) } , (error)=>{console.log(error)})
    }

  },[produitId , prestataireId , user]
  )

  console.log('avis' , reviews)

  return (
    <SafeAreaView style={styles.container}>
      <ReviewList reviews={reviews} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default Avis;
