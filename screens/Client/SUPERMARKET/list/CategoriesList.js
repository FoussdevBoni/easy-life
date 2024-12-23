import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../../assets/colors/colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import Br from '../../../../components/widgets/Br/Br';
import CategoriesListSection from '../../../../components/SUPERMARKET/sections/CategoriesListSection';
import { FlatList } from 'react-native';

function Categories({ user }) {
  const navigation =useNavigation()
    return (
        <View style={styles.container}>
         <Appbar.Header style={styles.header}>
        <StatusBar style="light" backgroundColor={colors.secondary} />

        {/* Avatar à gauche */}
        <Appbar.Action
          icon={() => (
            <Ionicons
              style={{ marginTop: -4, marginLeft: -7 }}
              size={30}
              name="chevron-back-circle"
              color="white"
            />
          )}
          onPress={() => {
            navigation.goBack()
          }}
        />

        {/* Informations du restaurant */}
        <View style={styles.infoContainer}>
          <Text style={styles.restaurantName}>
           Toutes les catégories
          </Text>
        </View>

        {/* Icône de notification à droite */}
       
      </Appbar.Header>
       <Br size={45}/>
          <FlatList 
           data={[{id: 1}]}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=> <CategoriesListSection key={item.id} user={user} />}
             initialNumToRender={10} 
             maxToRenderPerBatch={10} 
             windowSize={5} 
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
      header: {
    backgroundColor: colors.secondary,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  restaurantName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Categories;