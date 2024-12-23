import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Logout = (props) => (
    <Svg
        width={40}
        height={40}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect
            opacity={0.1}
            width={40}
            height={39.646}
            rx={19.823}
            fill="url(#a)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.141 13.38V11h11.9v16.66h-11.9v-2.38h9.521v-11.9h-9.521ZM10 19.331l4.761-3.57v2.38h9.521v2.38h-9.521V22.9L10 19.331Z"
            fill="url(#b)"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={0}
                y1={0}
                x2={0}
                y2={39.646}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FE6587" />
                <Stop offset={1} stopColor="#F52D6A" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={10}
                y1={11}
                x2={10}
                y2={27.66}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FE6587" />
                <Stop offset={1} stopColor="#F52D6A" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Logout;
