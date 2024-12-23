import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Rating } from "react-native-ratings";
import { Shadow } from "react-native-shadow-2";
import { COLORS, FONTS } from "../../../constants";
import { getDataById } from "../../../functions/backend/firebase/getData";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";
import { database } from "../../../firebase/firebaseConfig";
import { get, ref, set } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { Clock } from "../../widgets";
import { truncateText } from "../../../functions/frontend/truncateTexte";
import { getDistance } from "../../../functions/frontend/getDistance";
import getCurrentAddress from "../../../functions/frontend/getCurrentAdress";

function MedicamentItem({ item, user, setShop }) {
    const cartRef = ref(database, `carts/${user?.id}/${item?.id}`);
    const [isInCart, setIsInCart] = useState(false);
    const [prestataire, setPrestataire] = useState(null);
    const navigation =useNavigation()
    const addCart = useCallback(async (clicked) => {
        if (user && item) {
            const cartSnapshot = await get(cartRef);
            if (cartSnapshot.exists()) {
                setIsInCart(true);
            } else {
                if (clicked) {
                    await set(cartRef, item);
                    setIsInCart(true);
                    // Potentiellement mettre à jour le shop ici
                    // setShop((prevShop) => [...prevShop, item]);
                }
            }
        } else {
            Alert.alert('Erreur', 'Veuillez vous connecter pour ajouter des produits au panier.');
        }
    }, [user, item, cartRef]);

    useEffect(() => {
      
        const checkIfInCart = async () => {
            const cartSnapshot = await get(cartRef);
            if (cartSnapshot.exists()) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        };
        checkIfInCart();
    }, [item?.prestataireId, cartRef]);

    // Ajoutez des logs pour le débogage
  

       const [myCoords , setMyCoords] = useState(null)
   const getMyCoords = async ()=>{
      const data = await getCurrentAddress({user})
      const location = data?.location
      setMyCoords(location)
   }
  useEffect(()=>{
    getMyCoords()
  } , [])
        const result = getDistance(myCoords?.latitude , myCoords?.longitude , item?.location?.latitude , item?.location?.longitude)
        const distance = result!=='quelques' ? result.toFixed(0) : 'quelques'

    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate('medicament' , {medicament: item})
        }} style={{ paddingBottom: 15 }}>
            <Shadow
                startColor={COLORS.shadowStartColor}
                finalColor={COLORS.shadowFinalColor}
                distance={10}
            >
                <View
                    style={{
                        width: "100%",
                        height: 130,
                        backgroundColor: COLORS.white,
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 5,
                    }}
                >
                    <Image
                        source={{ uri: item.images[0] }}
                        style={{
                            width: 100,
                            height: "100%",
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                        }}
                    />
                    <View
                        style={{
                            marginVertical: 6,
                            marginHorizontal: 16,
                            flex: 1,
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text
                                style={{
                                    ...FONTS.Roboto_500Medium,
                                    fontSize: 16,
                                    textTransform: "capitalize",
                                    lineHeight: 16 * 1.2,
                                    marginTop: 2,
                                }}
                                numberOfLines={1}
                            >
                                {truncateText(item.nom , 20)}
                            </Text>
                            {!isInCart && (
                                <TouchableOpacity style={{ marginBottom: 2 }} onPress={() => { addCart(true) }}>
                                    <Ionicons name="add-circle" color={colors.primary} size={30} />
                                </TouchableOpacity>
                            )}
                        </View>
                       
                        <Text
                            style={{
                                ...FONTS.Roboto_400Regular,
                                fontSize: 12,
                                color: COLORS.gray2,
                                marginBottom: 8,
                            }}
                            numberOfLines={1}
                        >
                            {'Vendu par ' + item.prestaireName}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="location" style={{
                                ...FONTS.Roboto_400Regular,
                                fontSize: 12,
                                color: COLORS.gray2,
                                marginBottom: 8,
                            }} />
                            <Text style={{
                                ...FONTS.Roboto_400Regular,
                                fontSize: 12,
                                color: COLORS.gray2,
                                marginTop: -2,
                                marginLeft: 5
                            }}>
                                {item.adresse} ( à {distance} km)
                            </Text>
                        </View>
                         <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Clock />
                                        <Text
                                            style={{
                                                marginLeft: 6,
                                                ...FONTS.Roboto_400Regular,
                                                fontSize: 12,
                                                marginRight: 7,
                                                textTransform: "none",
                                                color: COLORS.gray2,
                                            }}
                                        >
                                            Sera livré dans {item.livraisonTime} min
                                        </Text>
                                    </View>
                    </View>
                </View>
            </Shadow>
        </TouchableOpacity>
    );
}

export default MedicamentItem;
