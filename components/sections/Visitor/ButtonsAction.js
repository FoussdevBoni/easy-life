import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../assets/colors/colors';

function ButtonsAction(props) {
    const navigation = useNavigation()
    return (
         <View style={styles.container}>
        <Text style={styles.message}>
          Ça y est ! Commençons
        </Text>

        <View style={styles.actionsButtons}>
          <TouchableOpacity
            // mode="contained"
            onPress={() => navigation.navigate('register')}
            style={styles.signUpBtn}
          >
            <Text style={{ color:'white' }}>Inscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            style={styles.signInBtn}
          >
            <Text style={{ color: colors.primary  }}>Connexion</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default ButtonsAction;


const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10
  },
  message: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    opacity: 0.6

  },
  actionsButtons: {
    padding: 20
  },
  signUpBtn: {
    borderRadius: 20,
    padding: 5,
    marginVertical: 4,
    justifyContent:'center',
    alignItems:'center',
    height:40,
    backgroundColor: colors.primary
  },
  signInBtn: {
    marginVertical: 4,
    justifyContent:'center',
    alignItems:'center',
    height:40,

  },

});
