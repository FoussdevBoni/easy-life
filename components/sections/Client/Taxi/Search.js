import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../assets/colors/colors';
import * as Location from 'expo-location';

import MapRoutes from './MapRoutes';

const API_KEY = 'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA';

const SearchForm = ({ user , produit}) => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
   const [originLocation, setOriginLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [location , setLocation] = useState(null)
    
    useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erreur', 'Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let address = await Location.reverseGeocodeAsync(location.coords);

    if (address.length > 0) {
      const { city, country } = address[0];
      console.log('postion actuelle' , {
        ville: city || user.ville , 
        pays: country || user.pays, 
        coords: location.coords
       
      })
      setLocation({
        ville: city || user.ville , 
        pays: country || user.pays, 
        coords: location.coords
       
      });
      console.log(
        {
        ville: city || user.ville , 
        pays: country || user.pays, 
        coords: location.coords
       
      }
      )
    }

  })();
}, []);
    const handleSearch = async () => {
        if (!origin || !destination) {
            alert("Veuillez sélectionner un lieu de départ et un lieu d'arrivée.");
            return;
        }1
try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin,
          destination,
          key: API_KEY
        }
      });

      if (response.data.status === 'OK') {
        const routes = response.data.routes[0];
        const legs = routes.legs[0];
        setOriginLocation(legs.start_location);
        console.log('depart' , {
          ville: '',
          pays: '',
          coords: legs.start_location
        } )
        setDestinationLocation(legs.end_location);
        console.log('depart log' ,legs.start_location)
      } else {
        console.error('Erreur dans la réponse de l\'API:', response.data.status);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };

  

    return (
        <View style={styles.container}>
           
          
          {originLocation&&destinationLocation ? <MapRoutes origin={originLocation} depart={origin} arrivee={destination} destination={destinationLocation} currentPosition={location} produit={produit}/>: (
             <View style={styles.searchContainer}>
                <View style={styles.searchInputs}>
                    <View style={{ flex: 1, width: '40%' }}>
                        <GooglePlacesAutocomplete
                            placeholder='Départ'
                            onPress={(data, details = null) => {
                                setOrigin(data.description);
                                 console.log('depart' ,data.description);

                            }}
                            query={{
                                key: API_KEY,
                                language: 'fr',
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, width: '40%', marginLeft: 10 }}>
                        <GooglePlacesAutocomplete
                            placeholder="Destination"
                            onPress={(data, details = null) => {
                                setDestination(data.description);
                                 console.log(data, details);

                            }}
                            query={{
                                key: API_KEY,
                                language: 'fr',
                            }}
                        />
                    </View>

                </View>

               <View style={{padding: 10}}>
                    <TouchableOpacity onPress={handleSearch}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Rechercher</Text>
              </View>
            </TouchableOpacity>
               </View>
            </View>
          )
          
          }
        </View>
    );
};

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInputs: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 0.4
    },
    searchContainer: {
        padding: 10,
        height: height * 0.75
    },
    mapContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
        
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        backgroundColor: colors.primary,
        color: 'black' , 
        borderRadius: 200
    },
    
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SearchForm;
