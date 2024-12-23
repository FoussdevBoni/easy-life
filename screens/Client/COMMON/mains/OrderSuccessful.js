import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";

import { FONTS, SAFEAREAVIEW , COLORS } from "../../../../constants";
import { Button, SuccessTwo } from "../../../../components/widgets";
import { useNavigation } from "@react-navigation/native";

export default function OrderSuccessful() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    justifyContent: "center",
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ alignSelf: "center", marginBottom: 36 }}>
                    <SuccessTwo />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_700Bold,
                        fontSize: 22,
                        textTransform: "capitalize",
                        color: COLORS.green,
                        marginBottom: 10,
                    }}
                >
                   Commande réussie !

                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_400Regular,
                        fontSize: 16,
                        color: COLORS.gray2,
                        marginBottom: 21,
                    }}
                >
                    Votre commande sera livrée à temps. Merci!
                </Text>
                <Button
                   onPress={()=>{navigation.navigate('plats-commande"')}}
                    title="Voir mes commandes"
                    containerStyle={{ marginBottom: 15 }}
                />
                <Button
                    
                    title="Continuer l'achat"
                    containerStyle={{ backgroundColor: COLORS.lightGreen }}
                    textStyle={{ color: 'white' }}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
