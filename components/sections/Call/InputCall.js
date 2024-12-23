import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Vibration, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';

export default function InputCall() {
  const [sound, setSound] = React.useState();
  const route = useRoute();
  const { driver } = route.params;

  const avatarScale = React.useRef(new Animated.Value(1)).current;
  const buttonSlide = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    // Charger le son de l'appel
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/audios/driver-alert.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    }
    loadSound();

    // Démarrer les vibrations
    Vibration.vibrate([500, 500, 500], true);

    // Animer l'image de l'appelant de manière continue
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarScale, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(avatarScale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animer les boutons
    Animated.timing(buttonSlide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      Vibration.cancel();
    };
  }, []);

  const handleRejectCall = () => {
    // Actions à effectuer lorsque l'appel est rejeté
    console.log('Appel annulé');
    if (sound) {
      sound.stopAsync();
    }
    Vibration.cancel();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarScale }] }]}>
        <Image source={{ uri: driver?.logo || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80" }} style={styles.avatar} />
      </Animated.View>
      <Text style={styles.callerName}>{driver?.nom || ' Un client inconnu'}</Text>
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonSlide }] }]}>
        <TouchableOpacity onPress={handleRejectCall} style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>
            Accepter 
          </Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={handleRejectCall} style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>
            Refuser
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  callerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: width * 0.4,
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    marginHorizontal: 5
  },
  rejectButton: {
    backgroundColor: 'red',

  },
  acceptButton: {
    backgroundColor: 'green'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
