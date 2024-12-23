import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../../assets/colors/colors';

export default function Landing({user}) {
  const navigation = useNavigation();
    const currentBalance = user?.solde || 0


  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back-circle" size={32} color="white" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <MaterialIcons name="location-on" size={24} color="#5E2598" />
          <Text style={styles.logoText}>EasyLife Market</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.balanceContainer}>
           <TouchableOpacity style={styles.addButton} onPress={() =>{
            navigation.navigate("recharge-account")
          }}>
            <Ionicons name="add-circle" size={28} color="white" />
          </TouchableOpacity>

          {/* Solde Display */}
          <View style={styles.balanceTextContainer}>
            <Text style={styles.balanceText}>Solde</Text>
            <View style={styles.balanceAmountContainer}>
              <Text style={styles.balanceAmount}>
                  {currentBalance}
              </Text>
            </View>
          </View>
        </View>

        {/* Promotional Messages */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Acheter depuis votre maison</Text>
        </View>

        <TouchableOpacity style={styles.imageContainer} onPress={()=>{
          navigation.navigate('course-home')
        }}>
          <Image
            source={require('../../../assets/images/banniers/course.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.messageContainer}>
          <Text style={{fontWeight: '900' , fontSize: 45 , textAlign: 'center' , color: 'white'}}>
             Course
          </Text>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Magasinez seulement , on s'occupe du reste
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 38,
  },
  logoText: {
    fontSize: 24,
    color: '#5E2598',
    marginLeft: 8,
    fontWeight: '900',
  },
  body: {
    flex: 1,
    marginTop: 20,
  },  balanceContainer: {
    backgroundColor: 'gray',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    paddingVertical: 30,
    justifyContent: 'center', // Centrer verticalement
    alignItems: 'center', // Centrer horizontalement
  },
  addButton: {
    position: 'absolute',
    top: -4,
    right: 0,
    padding: 0,
  },
  balanceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Facultatif si déjà centré par balanceContainer
  },
  balanceText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  balanceAmountContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: '40%',
  },
  balanceAmount: {
    fontSize: 22,
    color: '#7037AE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageContainer: {
    marginVertical: 15,
  },
  messageText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    opacity: 0.8

  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
