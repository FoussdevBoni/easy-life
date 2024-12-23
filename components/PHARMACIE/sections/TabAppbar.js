import React, { useEffect, useState } from 'react';
import { Appbar, Avatar, Badge } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { onValue, ref } from 'firebase/database';
import { getnotifications } from '../../../functions/frontend/getnotifications';
import { colors } from '../../../assets/colors/colors';
import { database } from '../../../firebase/firebaseConfig';

const TabAppBar = ({ user }) => {
  const navigation = useNavigation();
   const [notifications , setNotifications]= useState([])
  const _handleNotificationIconPress = () => {
    // Action à effectuer lors de l'appui sur l'icône de notification
    navigation.navigate('notifications');
  };

  const _openProfile = () => {
    navigation.navigate('profile');
  };

  // Remplacez 'userName' par le nom de l'utilisateur
  const userName = user?.nom;

  // Obtenez la première lettre du nom de l'utilisateur


  useEffect(() => {
    getnotifications(user, setNotifications);
   
  }, []);
  return (
    <Appbar.Header style={styles.header}>
    <StatusBar style="light" backgroundColor={colors.primary}/>
      <Image
        source={require('../../../assets/logo.png')} // Remplacez par le chemin de votre image
        style={styles.logo}
      />
      <Appbar.Action icon="bell" onPress={_handleNotificationIconPress} color="white" />
        {
          notifications.length >0 &&  <Badge style={styles.badge}>
        {notifications.length}
      </Badge>
        }
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    shadowColor: 'white',
    marginTop: 40,
  },
  avatar: {
    backgroundColor: 'white',
    color: colors.primary,
    marginLeft: -5,
  },
  logo: {
    width: '90%', // Définissez la largeur de l'image
    height: '50%', // Définissez la hauteur de l'image
    resizeMode: 'contain', // Redimensionnez l'image pour qu'elle s'adapte au conteneur
    marginLeft: -80, // Centre l'image horizontalement
    marginRight: 'auto', // Centre l'image horizontalement
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 25,
    color: 'white',
    backgroundColor: 'red',
  },
});

export default TabAppBar;
