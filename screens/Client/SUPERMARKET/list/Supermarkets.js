import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Appbar } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import SupermarketListSection from '../../../../components/SUPERMARKET/sections/SupermarketsListSection';

function Supermarkets(props) {
    const navigation = useNavigation()
    return (
        <View  style={styles.container}>
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
            Supermarchés 
          </Text>
        </View>

        
      </Appbar.Header>
          <View style={{
           
            flex: 1,
            padding: 10
          }}>
             <FlatList
         horizontal={false}
         showsVerticalScrollIndicator={false}
        data={[{id: "1"}]}
        renderItem={({ item }) => <SupermarketListSection horizontal={false} key={item.id}/>}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10} 
        maxToRenderPerBatch={10} 
        windowSize={5} 
      />
          </View>
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
export default Supermarkets;
