import { Dimensions } from "react-native";
import { Platform, StatusBar } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    black: "#262B2E",
    white: "#fff",
    gray1: "#eaeef4",
    gray2: "#a6bbd3",
    green: "#374f71",
    lightGreen: "#416088",
    lightGreen_02: "#2f425d",
    lightYellow: "#7bdfb4",
    lightRed: "rgba(254,33,33, 0.1)",
    transparent: "rgba(0,0,0, 0)",
    lightGray: "#f5f7fa",
    lightLilac: "#F4F1FC",
    carrot: "#FE724E",
    darkBlue: "#1d2634",
    yellow: "#7BDFB4",
    red: "#FE2121",
    lightPink: "#FFEDF2",

    shadowStartColor: "rgb(196,196,196, 0.07)",
    shadowFinalColor: "rgb(255, 255, 255, 0.08)",
    shadowDistance: 12,
};

export const SIZES = {
    width,
    height,

    paddingTop_01: 20,
    paddingTop_02: 30,
    paddingTop_03: 40,
    paddingVertical: 25,

    paddingTop: 25,
    paddingBottom: 25,
};

export const FONTS = {
    Roboto_400Regular: {
        fontFamily: "Roboto_400Regular",
    },
    Roboto_500Medium: {
        fontFamily: "Roboto_500Medium",
    },
    Roboto_700Bold: {
        fontFamily: "Roboto_700Bold",
    },
    H1: {
        fontFamily: "Roboto_700Bold",
        fontSize: 30,
    },
    H2: {
        fontFamily: "Roboto_700Bold",
        fontSize: 22,
        color: COLORS.green,
        textTransform: "capitalize",
        textAlign: "center",
        lineHeight: 22 * 1.2,
    },
    H4: {
        fontFamily: "Roboto_400Regular",
        fontSize: 16,
        color: COLORS.gray2,
        textAlign: "center",
        lineHeight: 16 * 1.3,
    },
};

export const SAFEAREAVIEW = {
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    DefaultBackground: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
};
