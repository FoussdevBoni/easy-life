import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../../../assets/colors/colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import MedicoListSection from '../../../../components/PHARMACIE/sections/MedicoListSection';
import { useNavigation } from '@react-navigation/native';

function Medicaments({ user }) {
  const navigation = useNavigation()
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
            Médicaments urgents
          </Text>
        </View>

        {/* Icône de notification à droite */}
        <View style={styles.notificationContainer}>
          <Appbar.Action  icon={() => (
            <Ionicons
              style={{ marginTop: -4, marginLeft: -7 }}
              size={30}
              name="search"
              color="white"
            />
          )}
          onPress={() => {
            navigation.navigate("search")
          }}
           color="white" />
        </View>
      </Appbar.Header>
        <ScrollView showsVerticalScrollIndicator={false}>
            <MedicoListSection user={user} />
        </ScrollView>
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

export default Medicaments;
