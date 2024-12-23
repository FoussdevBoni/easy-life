import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';

export default function CallScreen() {
  const [sound, setSound] = React.useState();
  const route = useRoute();
  const { data } = route.params;

  const avatarScale = React.useRef(new Animated.Value(1)).current;
  const buttonSlide = React.useRef(new Animated.Value(300)).current;
  const navigation = useNavigation()
  React.useEffect(() => {
    // Charger le son de l'appel sortant
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/audios/out-call.wav') 
      );
      setSound(sound);
      await sound.playAsync();
    }
    loadSound();

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
    };
  }, []);

  const handleRejectCall = () => {
    // Actions à effectuer lorsque l'appel est rejeté
    console.log('Appel annulé');

    if (sound) {
      sound.stopAsync();
     navigation.goBack()

    }
  };

  return (
    <View style={styles.container}>
         <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Animated.View style={[styles.avatarContainer, { transform: [{ scale: avatarScale }] }]}>
        <Image source={{ uri: data.logo || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80" }} style={styles.avatar} />
      </Animated.View>
      <Text style={styles.callerName}>{data.nom}</Text>
      <Animated.View style={[styles.buttonContainer, { transform: [{ translateY: buttonSlide }] }]}>
        <TouchableOpacity onPress={handleRejectCall} style={[styles.button, styles.rejectButton]}>
          <Text style={styles.buttonText}>Annuler l'appel</Text>
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
    width: width * 0.8,
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
