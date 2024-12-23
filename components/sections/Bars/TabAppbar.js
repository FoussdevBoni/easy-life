import React, { useEffect, useState } from 'react';
import { Appbar, Avatar, Badge } from 'react-native-paper';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location'; // Importer expo-location
import { getnotifications } from '../../../functions/frontend/getnotifications';
import { onValue, ref } from 'firebase/database';
import { database } from '../../../firebase/firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons'; // Pour l'icône de localisation

const TabAppBar = ({ user }) => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [location, setLocation] = useState(null); // État pour la localisation
  const [city, setCity] = useState(null); // État pour la ville
  const [errorMsg, setErrorMsg] = useState(null);

  const _handleNotificationIconPress = () => {
    navigation.navigate('notifications');
  };

  const _openProfile = () => {
    navigation.navigate('profile');
  };

  // Obtenir la localisation de l'utilisateur et la ville
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        setCity(reverseGeocode[0].city); 
      }
    })();
  }, []);

  let locationText = 'Fetching location...';
  if (errorMsg) {
    locationText = errorMsg;
  } else if (city) {
    locationText = city; 
  }

  const callPath = user.id ? 'drivers/' + user.id : 'drivers/' + user._id;

  useEffect(() => {
    getnotifications(user, setNotifications);
    const callRef = ref(database, callPath);
    onValue(callRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        navigation.navigate('input-call', { data });
      }
    });
  }, []);

  return (
    <Appbar.Header style={styles.header}>
      <StatusBar style="light" backgroundColor={colors.primary} />

      {/* Avatar à gauche */}
      <Appbar.Action
        icon={() => <Avatar.Image size={30} style={{marginLeft: -4 , backgroundColor: 'white'}} source={{ uri: 'https://cdn-icons-png.freepik.com/512/61/61205.png' }} />}
        onPress={_openProfile}
      />

      {/* Localisation avec icône au centre */}
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={24} color="white" /> 
        <Text style={styles.locationText}>{locationText}</Text>
      </View>

      {/* Icône de notification à droite avec badge */}
      <View style={styles.notificationContainer}>
        <Appbar.Action icon="bell" onPress={_handleNotificationIconPress} color="white" />
        {notifications.length > 0 && (
          <Badge style={styles.badge}>{notifications.length}</Badge>
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5, // Espace entre l'icône et le texte
  },
  notificationContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    color: 'white',
  },
});

export default TabAppBar;
