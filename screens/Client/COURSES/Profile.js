import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Appbar, Divider, Button, ActivityIndicator } from 'react-native-paper';
import { colors } from '../../../assets/colors/colors';
import { takePhoto } from '../../../functions/frontend/uploadPhoto';
import { updateData } from '../../../functions/backend/firebase/updateData';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../reducer/userSlice';
import { useNavigation } from '@react-navigation/native';

function Profile({ user }) {
  const [dataChanged, setDataChanged] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [name, setName] = useState(user?.nom || '');
  const [phone, setPhone] = useState(user?.tel || '');
  const [profilePic, setProfilePic] = useState(user?.profile || '');
  const [imageLoading, setImageLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigation  = useNavigation()
  // Fonction qui vérifie si les données ont changé
  const handleDataChange = (newName, newPhone) => {
    if (newName !== user?.nom || newPhone !== user?.tel || profilePic !== user?.profile) {
      setDataChanged(true);
    } else {
      setDataChanged(false);
    }
  };

  const changeProfilePic = async () => {
    try {
      setImageLoading(true);
      const data = (await takePhoto('library', 'images/profiles/' + user?.userId, user?.userId)).uploadResp;
      const imageUrl = data?.downloadUrl;
      setProfilePic(imageUrl);
      setImageLoading(false);
      setDataChanged(true);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la modification de la photo de profil');
      setImageLoading(false);
    }
  };

  const updateProfile = () => {
    const newUser = {
      ...user,
      profile: profilePic,
      tel: phone,
      nom: name,
      id: user?.id,
    };

    setSubmitting(true);
    updateData(
      'clients',
      user.id,
      newUser,
      () => {
        Alert.alert('Succès', 'Votre profil a été mis à jour avec succès');
        setSubmitting(false);
        setDataChanged(false);
      },
      () => {
        Alert.alert('Échec', 'La mise à jour de votre profil a échoué');
        setSubmitting(false);
      }
    );
  };

  const logout = () => {
    dispatch(setUser(null));
    Alert.alert('Déconnecté', 'Vous avez été déconnecté avec succès.');
  };

  return (
     <>
     {
      user && <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          icon={() => (
            <Ionicons
              style={{ marginTop: -4, marginLeft: -7 }}
              size={30}
              name="chevron-back-circle"
              color="white"
            />
          )}
          onPress={() => {
            navigation.goBack()
          }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Mon profil</Text>
        </View>
      </Appbar.Header>

         {
          user &&   <View style={styles.detailsContainer}>
        <View style={styles.profileContainer}>
          <Image style={styles.profilePic} source={{ uri: profilePic || 'https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg' }} />
          <TouchableOpacity style={styles.editBtn} onPress={changeProfilePic}>
            {imageLoading ? <ActivityIndicator color={colors.primary} size={30} /> : <Ionicons name="camera" size={24} color="black" />}
          </TouchableOpacity>
        </View>
        <Divider />

        {/* Username Section */}
        <View style={styles.userNameContainer}>
          {editName ? (
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={(text) => {
                setName(text);
                handleDataChange(text, phone);
              }}
              onBlur={() => setEditName(false)}
            />
          ) : (
            <Text style={styles.username}>{name}</Text>
          )}
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditName(true)}>
            <Ionicons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
         }

      <View style={styles.detailsContainer}>
        {/* Phone Section */}
        <View style={styles.phoneContainer}>
          {editPhone ? (
            <TextInput
              style={styles.textInput}
              value={phone}
              keyboardType="phone-pad"
              onChangeText={(text) => {
                setPhone(text);
                handleDataChange(name, text);
              }}
              onBlur={() => setEditPhone(false)}
            />
          ) : (
            <Text style={styles.phone}>{phone}</Text>
          )}
          <TouchableOpacity style={styles.editBtn} onPress={() => setEditPhone(true)}>
            <Ionicons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.passwordChange}>
        <TouchableOpacity style={styles.passwordChangeRow}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <Text style={styles.passwordChangeText}>Changer le mot de passe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutBtnContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.logoutBtnText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>

      {/* Button "Mettre à jour" */}
      {dataChanged && (
        <View style={styles.updateBtnContainer}>
          <TouchableOpacity
            style={[styles.updateButton, submitting && { opacity: 0.5 }]}
            onPress={updateProfile}
            disabled={submitting}
          >
            {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.updateBtnText}>Mettre à jour</Text>}
          </TouchableOpacity>
        </View>
      )}
    </View>
     }
     
     </>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: colors.secondary,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editBtn: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 18,
    fontWeight: '600',
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
    fontWeight: '600',
  },
  passwordChange: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  passwordChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordChangeText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 18,
  },
  updateBtnContainer: {
    alignItems: 'center',
    marginBottom: 3,
    alignSelf: 'stretch',
    padding: 10,
  },
  updateButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  updateBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutBtnContainer: {
     alignItems: 'center',
    marginBottom: 3,
    alignSelf: 'stretch',
    padding: 10,

  },
  logoutBtn: {
    flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // Centrer le contenu horizontalement
  backgroundColor: '#ccc',
  paddingVertical: 15,
  borderRadius: 30,
  width: '100%',
  marginTop: 10,
  },
  logoutBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
