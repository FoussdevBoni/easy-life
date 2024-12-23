import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../../reducer/cartSlice';
import StackAppbar from '../../../components/PHARMACIE/sections/StackAppBar';
import { colors } from '../../../assets/colors/colors';
import { StatusBar } from 'expo-status-bar';
import {
  Actionsheet,
  useDisclose,
} from 'native-base';

const {width , height} = Dimensions.get("screen")

function Cart({ user }) {
    const dispatch = useDispatch();
  const allcart = useSelector((state) => state.cart.cartData);
  const cart = allcart.filter(item => item.layout === 'pharmacie' || item.layout === 'supermarket');

  const medicaments = cart.filter(item => item.layout === 'pharmacie');
  const articles = cart.filter(item => item.layout === 'supermarket');

  const [quantities, setQuantities] = useState(cart.map((item) => item.quantity));
  const navigation = useNavigation();

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleAdd = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  const handleSubtract = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  const handleRemove = (itemId) => {
    const updatedCart = allcart.filter((item) => item.id !== itemId);
    dispatch(setCart(updatedCart));
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item, index) => total + item.prix * quantities[cart.indexOf(item)], 0);
  };

    return (
        <View style={styles.container}>
            <StackAppbar title="Mon panier" styles={{ bgColor: colors.secondary, textColor: 'white' }} goBack={navigation.goBack}/>
            <StatusBar backgroundColor={colors.secondary} style='light'/>
           <View style={{height: height*0.56}}>
                 <ScrollView style={{ padding: 10 }}>
                {cart.length === 0 ? (
                    <Text style={styles.emptyCartText}>Votre panier est vide</Text>
                ) : (
                    cart.map((item, index) => (
                        <View key={item.id} style={styles.cartItem}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.image} source={{ uri: item.images[0] }} />
                            </View>
                            <View style={styles.detailsContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.nameText}>{item?.nom}</Text>
                                </View>
                                <View style={styles.timeContainer}>
                                    <Ionicons name="time" size={25} />
                                    <Text>{item?.time}</Text>
                                </View>
                                <View style={styles.prixAndQntiteContainer}>
                                    <View style={styles.prixContainer}>
                                        <Text style={styles.prixText}>{item?.prix} FCFA</Text>
                                    </View>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            onPress={() => handleSubtract(index)}
                                            style={styles.quantityButton}
                                            disabled={quantities[index] === 1}
                                        >
                                            <Text style={[styles.quantityText, quantities[index] === 1 && { color: 'gray' }]}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantity}>{quantities[index]}</Text>
                                        <TouchableOpacity onPress={() => handleAdd(index)} style={styles.quantityButton}>
                                            <Text style={styles.quantityText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
                                <Ionicons name="trash-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
            </View>

            <View style={styles.about}>
                <Text style={styles.aboutText}>{cart.length} produits sélectionnés</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountLabel}>Montant total:</Text>
                    <Text style={styles.amountValue}>{calculateTotal(cart)} FCFA</Text>
                </View>
                <View style={styles.commandeContainer}>
                    {cart.length ? (
                        <TouchableOpacity style={styles.commandeButton} onPress={onOpen}>
                            <Text style={styles.commandeButtonText}>Commander</Text>
                        </TouchableOpacity>
                    ) : null
                    
                     }
                </View>
            </View>

            {/* Bottom Sheet with ActionSheet from NativeBase */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                     {
                        articles.length>0 &&   <Actionsheet.Item onPress={() => navigation.navigate("article-commande-form" , {cart: articles , amount: calculateTotal(articles)})}>
                         {" Commander les articles ("+ calculateTotal(articles)+"F )"}
                    </Actionsheet.Item>
                     }
                     {
                        medicaments.length > 0 &&  <Actionsheet.Item onPress={() => navigation.navigate("medico-commande-form" , {cart: medicaments , amount: calculateTotal(medicaments)})}>
                         {" Commander les médicaments ("+ calculateTotal(medicaments)+"F )"}
                    </Actionsheet.Item>
                     }
                    <Actionsheet.Item onPress={onClose} color="red.500">
                        Annuler
                    </Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    );
}

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        height: 100,
        alignItems: 'center',
        position: 'relative',
    },
    imageContainer: {
        width: '30%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover',
    },
    detailsContainer: {
        width: '70%',
        padding: 10,
        justifyContent: 'center',
    },
    nameContainer: {
        marginBottom: 5,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prixAndQntiteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    prixContainer: {},
    prixText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderRadius: 15,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    quantityButton: {
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 20,
    },
    quantityText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#FFF',
    },
    about: {
         flex: 2,
        backgroundColor: '#ccc',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        justifyContent: 'flex-end',
        paddingTop: 50,
        height: height*0.8,
    },
    aboutText: {
        fontSize: 20,
        fontWeight: '500',
    },
    amountContainer: {
        flexDirection: 'row',
        marginTop: 12,
    },
    amountLabel: {
        fontSize: 20,
    },
    amountValue: {
        fontSize: 20,
        marginLeft: 12,
    },
    commandeContainer: {
        alignItems: 'center',
        marginBottom: 3,
        alignSelf: 'stretch',
    },
    commandeButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    commandeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    emptyCartText: {
        textAlign: 'center',
        fontSize: 18,
        marginVertical: 20,
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
