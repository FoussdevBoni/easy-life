// MyAppbar.js
import React, { useEffect, useState } from 'react';
import { Appbar, Avatar, Badge, Searchbar, Title } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getnotifications } from '../functions/getnotifications';
import { colors } from '../data/colors';

const TabAppBar = ({user }) => {
const [notifications , setNotifications] = useState([])

  const navigation = useNavigation();

  const _handleNotificationIconPress = () => {
    // Action à effectuer lors de l'appui sur l'icône de notification
    navigation.navigate("notifications")
  };

  const _openProfile = () => {
    navigation.navigate('profil');
  };

  // Remplacez 'groupName' par le nom de l'utilisateur
  const groupName = user?.nom ||'BONI';

  // Obtenez la première lettre du nom de l'utilisateur
  const avatarInitial = groupName?.charAt(0).toUpperCase();
 useEffect(()=>{
    getnotifications(user , setNotifications)
   

  } , [])
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon={() => <Avatar.Text color={colors.primary} size={30} label={avatarInitial} style={styles.avatar} />} onPress={_openProfile} />
        <Appbar.Content title={groupName}  color='white'>
        </Appbar.Content>
      <Appbar.Action icon="bell" color='white' onPress={_handleNotificationIconPress}/>
         {
          notifications.length <=0 &&  <Badge style={styles.badge}>
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

  },
  avatar: {
    backgroundColor: 'white', 
    color: colors.primary,
    marginTop: -5,
    marginLeft: -4
    // Couleur d'arrière-plan rouge pour l'avatar
  },
  searchbar: {
    backgroundColor: '#f4f5f8',
    flex: 1,
    marginRight: 10,
    borderRadius: 30,
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
