import * as Location from 'expo-location';
import { Alert } from 'react-native';

const getCurrentAddress = async ({ user = {} }) => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erreur', 'Permission to access location was denied');
      return {
        ville: user.ville || '',
        pays: user.pays || '',
        location: null
      };
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);

    if (address.length > 0) {
      const { city, country } = address[0];
      return {
        ville: city || user.ville || '',
        pays: country || user.pays || '',
        location: location.coords
      };
    } else {
      return {
        ville: user.ville || '',
        pays: user.pays || '',
        location: location.coords
      };
    }
  } catch (error) {
    console.error(error);
    return {
      ville: user.ville || '',
      pays: user.pays || '',
      location: null
    };
  }
}

export default getCurrentAddress;
