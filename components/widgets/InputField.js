import { View, Text, TextInput } from "react-native";
import React from "react";

import { COLORS, FONTS } from "../../constants";

export default function InputField({
    contaynerStyle,
    placeholder,
    leftIcon,
    rightIcon,
    secureTextEntry,
}) {
    return (
        <View
            style={{
                width: "100%",
                height: 50,
                backgroundColor: COLORS.lightGray,
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
                ...contaynerStyle,
            }}
        >
            {leftIcon && <View style={{ paddingRight: 14 }}>{leftIcon}</View>}
            <TextInput
                style={{ flex: 1 }}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
