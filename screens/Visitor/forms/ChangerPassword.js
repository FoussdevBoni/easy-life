import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../../../assets/colors/colors';
import { auth } from '../../../firebase/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth , email)
      .then(() => {
        alert('Un email de réinitialisation a été envoyé à votre adresse.');
        navigation.goBack(); // Retour à l'écran précédent après envoi du mail
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <StatusBar style="dark" backgroundColor={''} />
      <View style={styles.container}>
        <Text style={styles.title}>Réinitialiser le mot de passe</Text>
        <Text style={styles.subtitle}>
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.inputControl}
            placeholder="Entrez votre adresse email"
            placeholderTextColor="#6b7280"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={handleResetPassword}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Envoyer le lien de réinitialisation</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#929292',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    marginBottom: 16,
  },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
