import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";


import { COLORS, FONTS } from "../../constants";
import Arrow from "./svg/Arrow";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/colors/colors";
import { truncateText } from "../../functions/frontend/truncateTexte";

export default function Header({ title, onPress, titleStyle }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 42,
            }}
        >
            <TouchableOpacity
                style={{ position: "absolute", left: 0, paddingHorizontal: 30 }}
                onPress={onPress}
            >
               <Ionicons name="chevron-back-outline" size={30} color={colors.primary}/>
            </TouchableOpacity>
            <Text
                style={{
                    fontSize: 18,
                    ...FONTS.Roboto_500Medium,
                    color: COLORS.black,
                    ...titleStyle,
                }}
            >
                {truncateText(title , 30)}
            </Text>
        </View>
    );
}
