import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const MapRoutes = ({ origin, destination }) => {
  const originLocation = { latitude: origin?.lat ?? 0, longitude: origin?.lng ?? 0 };
  const destinationLocation = { latitude: destination?.lat ?? 0, longitude: destination?.lng ?? 0 };
  const navigation = useNavigation();

  const mapRegion = {
    latitude: originLocation.latitude,
    longitude: originLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {origin && destination && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
         
          ref={(mapRef) => (this.mapRef = mapRef)}
        >
          {/* Marqueur de départ */}
          <Marker
            coordinate={{
              latitude: originLocation.latitude,
              longitude: originLocation.longitude,
            }}
            title="Départ"
            pinColor="blue"
            icon={() => <Ionicons name="home" size={50} color={'red'} />}
          />

          {/* Marqueur de destination */}
          <Marker
            coordinate={{
              latitude: destinationLocation.latitude,
              longitude: destinationLocation.longitude,
            }}
            title="Destination"
            pinColor="blue"
          />

          {/* Ligne de direction entre le départ et la destination */}
          <MapViewDirections
            origin={originLocation}
            destination={destinationLocation}
            apikey={'AIzaSyCNJXjPNJI96OQs2Qfin46-Ow7sSeXx8nA'}
            strokeWidth={10}
            strokeColor="blue"
          />
        </MapView>
      )}
    </View>
  );
};

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: height * 0.4,
  },
});

export default MapRoutes;
