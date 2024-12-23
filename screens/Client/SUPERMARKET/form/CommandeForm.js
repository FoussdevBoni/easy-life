import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Modal, TextInput, Alert } from 'react-native';
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import { colors } from '../../../../assets/colors/colors';
import { Appbar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateData } from '../../../../functions/backend/firebase/updateData';
import { sendNotifications } from '../../../../functions/frontend/notifications';
import getCurrentAddress from '../../../../functions/frontend/getCurrentAdress';
import { postData } from '../../../../functions/backend/firebase/postData';
import { setUser } from '../../../../reducer/userSlice';
import { useDispatch } from 'react-redux';
import { handlePayByMomo } from '../../../../functions/payer';
import axios from 'axios';

function ArticleCommandeForm({ user }) {
 const [selectedLocation, setSelectedLocation] = useState('home');
const [selectedPayment, setSelectedPayment] = useState('mainAccount');
const { cart , amount } = useRoute().params;
const supermarketCart = cart.filter(item => item.layout === 'supermarket');
const [currentAddress, setCurrentAddress] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [details, setDetails] = useState("");
const [loading, setLoading] = useState(false);
const dispatch = useDispatch()
const [modalVisible1, setModalVisible1] = useState(false);
const [phoneNumber , setPhoneNumber] = useState(user.tel)
const [payementRef , setPayementRef] = useState("")
const navigation = useNavigation();

const sendNotif = () => {
    const notification = {
        message: `${user?.nom} a commandée  ${supermarketCart.length} articles `,
        date: new Date().toISOString(),
        receiverId: 'superadminId',
    };

    sendNotifications(notification)
        .catch((error) => {
            console.log(error);
            alert("Une erreur s'est produite lors de l'envoi de la notification.");
        });
};



const handleSendCommande = () => {
   setLoading(true)
  const products = supermarketCart.map((item=>({
    id: item.id,
    nom: item.nom,
    prix: item.prix,
    quantite: item.quantite,
    layout: item.layout,
    prestataireName: item.prestataireName,
    prestataireId: item.prestataireId,
    categorie: item.categorie,
    image: item.images[0],
    quantity: item.quantity,
  })))

  const commande= {
        clientId: user.id,
        products,
        contact: user.tel,
        productType: 'article',
        statut: 'En attente',
        date: new Date().toISOString(),
        adresse: currentAddress,
        client: user.nom,
        details,
        selectedLocation,
        selectedPayment
      
  }


   postData('commandes', commande, (id) => {
        sendNotif()        
      setLoading(false) 
        }, (error) => {
          Alert.alert("Oups !" , "Une erreur s'est produite lors de l'envoie de la commande. Veillez réessayer")
           setLoading(false)
        });
};

const handleSubmit = ()=>{

            const currentBalance = user.solde || 0
            if (selectedPayment==='mainAccount') {

              const newBalance = parseFloat(currentBalance) - parseFloat(amount)
              if (newBalance<0) {
                Alert.alert("Désolé" , "Votre solde est insuffisant pour cet achat. Veillez recharger votre compte")
                  sendNotif()
                 setLoading(false) 
              }else{
                   setLoading(true)
                const newUser = {
                  ...user,
                  solde: newBalance
                }
                 updateData("clients" , user.id , newUser , ()=>{
                  dispatch(setUser(newUser))

                  handleSendCommande()


                 } , (error)=>{
                   Alert.alert("Erreur" , "Une erreur est survenue lors de l'opération. Veillez réessayer")
                 }) 
              }


            }else{

              setLoading(true)
              
                 handlePayByMomo(amount , phoneNumber , user , setLoading , 'Achat de plats' , (data)=>{
                   const { status, transaction_ref } = data;
                   setPayementRef(transaction_ref)
                 },
                 (error)=>{
                  console.log('error' , error)
                  setLoading(false)
                 }
                 
                 
                 )

            }
}
 




useEffect(()=>{

  const getAddress = async()=>{
    const myAddress = await getCurrentAddress({user})
    setCurrentAddress(myAddress)
  }

  getAddress()

 
} , [])

  // Suivi du statut du paiement
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!payementRef) return; // Pas besoin de vérifier si pas de transaction

      try {
        const response = await axios.get(
          `https://my-coolpay.com/api/23b12b2c-0274-4556-b1e8-39e21b9830b0/checkStatus/${payementRef}`
        );
        const { transaction_status } = response.data;

        if (transaction_status === "SUCCESS") {
          handleSendCommande()
        } else if (transaction_status === "FAILED") {
          Alert.alert("Échec", "La transaction a échoué.");
          setLoading(false);
          
        } else {
            
          console.log("Statut de transaction en attente ou inconnu.");
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du statut de paiement:", error);
      }
    };

    if (payementRef) {
      const intervalId = setInterval(checkPaymentStatus, 5000); // Vérifier toutes les 5 secondes
      return () => clearInterval(intervalId); // Nettoyer l'intervalle après l'utilisation
    }
  }, [payementRef]);


  return (
    <View style={styles.container}>
      {/* Header */}
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
          <Text style={styles.titleText}>Paiement</Text>
        </View>
      </Appbar.Header>

      {/* Main content */}
      <View style={styles.contentContainer}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            La commande sera livrée à {user?.nom}
          </Text>
        </View>

        {/* Destination selection */}
        <View style={styles.destinationsContainer}>
          <View style={styles.destination}>
            <View style={styles.row}>
              <RadioButton
                value="home"
                status={selectedLocation === 'home' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedLocation('home')}
              />
              <Text style={styles.destinationText}>Chez moi</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="call-outline" size={25} />
              <Text style={styles.destinationText}>
                {user.tel}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={25} />
              <Text style={styles.destinationText}>
                {currentAddress?.ville ? currentAddress?.ville: 'Ma position'}
              </Text>
            </View>
          </View>

          <View style={styles.destination}>
            <View style={styles.row}>
              <RadioButton
                value="work"
                status={selectedLocation === 'work' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedLocation('work')}
              />
              <Text style={styles.destinationText}>Au travail</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="call-outline" size={25} />
              <Text style={styles.destinationText}>
                {user.tel}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={25} />
              <Text style={styles.destinationText}>
               {currentAddress?.ville ? currentAddress?.ville: 'Ma position'}

              </Text>
            </View>
          </View>
        </View>

        {/* Payment method selection */}
       <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>Méthode de paiement</Text>

          <View style={styles.row}>
           
            <Text style={styles.paymentText}>
              Compte EASY-LIFE
            </Text>
             <RadioButton
              value="mainAccount"
              status={selectedPayment === 'mainAccount' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedPayment('mainAccount')}
            />
          </View>

          <View style={styles.row}>
           
            <Text style={styles.paymentText}>
              {'Mobile Money        '   }
            </Text>
             <RadioButton
              value="momo"
              status={selectedPayment === 'momo' ? 'checked' : 'unchecked'}
              onPress={() => {
                setModalVisible1(true)
                setSelectedPayment('momo')
              }}
            />
          </View>

       
        </View>
         {/* Button to open the modal */}
          <TouchableOpacity
            style={styles.addDetailsButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addDetailsButtonText}>Ajouter plus de précisions</Text>
          </TouchableOpacity>
      </View>


      {/* Footer: Amount and validation button */}
      <View style={styles.about}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Montant total :</Text>
          <Text style={styles.amountValue}>{amount} FCFA</Text>
        </View>

        <View style={styles.validationContainer}>
          <TouchableOpacity style={styles.validationButton} onPress={()=>{
              if (!loading) {
              handleSubmit()
            }else{
              Alert.alert("Désolé" , "Une opération est en cour")
            }
          }}>
            {
              !loading ? <Text style={styles.validationButtonText}>Valider</Text>: <ActivityIndicator size={25} color='white'/>
            }
          </TouchableOpacity>
        </View>
      </View>

       <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <Appbar.Header style={styles.modalHeader}>
            <Appbar.Action
              icon={() => (
                <Ionicons
                  style={{ marginTop: -4, marginLeft: -7 }}
                  size={30}
                  name="chevron-back-circle"
                  color="white"
                />
              )}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Précisions supplémentaires</Text>
            </View>
          </Appbar.Header>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            <TextInput
               multiline
               numberOfLines={5}
              style={styles.input}
              placeholder="Entrez plus de détails"
              value={details}
              onChangeText={setDetails}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                console.log(details); // Gérer les détails ici
                setModalVisible(false);
              }}
            >
              <Text style={styles.submitButtonText}>Soumettre</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

         <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible1}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <Appbar.Header style={styles.modalHeader}>
            <Appbar.Action
              icon={() => (
                <Ionicons
                  style={{ marginTop: -4, marginLeft: -7 }}
                  size={30}
                  name="chevron-back-circle"
                  color="white"
                />
              )}
              onPress={() => setModalVisible1(false)}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Ajouter votre numéro Mobile Money
              </Text>
            </View>
          </Appbar.Header>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre numéro Mobile money"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                setModalVisible1(false);
              }}
            >
              <Text style={styles.submitButtonText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ArticleCommandeForm;

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
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  destinationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  destination: {
    flexDirection: 'column',
    width: '48%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  destinationText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  about: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
   addDetailsButton: {
     backgroundColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  addDetailsButtonText: { color: 'black', fontSize: 16 },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 18,
    color: '#555',
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  validationContainer: {
    alignItems: 'center',
  },
  validationButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  validationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  paymentContainer: {
    marginTop: 20,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 100
  },

  modalContainer: { flex: 1, backgroundColor: 'white' },
  modalHeader: { backgroundColor: colors.secondary },
  modalContent: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButton: {
   backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: { color: 'white', fontSize: 16 },
});
