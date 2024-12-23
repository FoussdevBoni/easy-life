import * as React from "react";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

const CircleElement = (props) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={6} cy={6} r={6} fill="url(#a)" />
        <Defs>
            <LinearGradient
                id="a"
                x1={0}
                y1={0}
                x2={0}
                y2={12}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE00D" />
                <Stop offset={1} stopColor="#FEA127" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default CircleElement;
