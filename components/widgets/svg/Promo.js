import * as React from "react";
import Svg, {
    Circle,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";

const Promo = (props) => (
    <Svg
        width={50}
        height={50}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle opacity={0.1} cx={25} cy={25} r={25} fill="url(#a)" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35 34H15a2 2 0 0 1-2-2v-4a.5.5 0 0 1 .5-.5 2.5 2.5 0 0 0 0-5 .5.5 0 0 1-.5-.5v-4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v4a.5.5 0 0 1-.5.5 2.5 2.5 0 0 0 0 5 .5.5 0 0 1 .5.5v4a2 2 0 0 1-2 2Zm-15.5-4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5Zm9.5-5a2.3 2.3 0 0 0-2 2.5 2.3 2.3 0 0 0 2 2.5 2.3 2.3 0 0 0 2-2.5 2.3 2.3 0 0 0-2-2.5Zm.5-5a.5.5 0 0 0-.416.223l-6 9a.5.5 0 1 0 .832.554l6-9A.5.5 0 0 0 29.5 20Zm-10 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5Zm4.5-6a2.3 2.3 0 0 0-2 2.5 2.3 2.3 0 0 0 2 2.5 2.3 2.3 0 0 0 2-2.5 2.3 2.3 0 0 0-2-2.5Zm-4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5Zm0-4.126a.5.5 0 0 0-.5.5V19.5a.5.5 0 0 0 1 0v-1.125a.5.5 0 0 0-.5-.5v-.001Z"
            fill="#26CEC0"
        />
        <Path d="M10 10h30v30H10V10Z" fill="url(#b)" />
        <Path d="M10 10h30v30H10V10Z" fill="url(#c)" />
        <Defs>
            <LinearGradient
                id="a"
                x1={0}
                y1={0}
                x2={0}
                y2={50}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#23D2C3" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#01BCAD" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={10}
                y1={10}
                x2={10}
                y2={40}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#23D2C3" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#01BCAD" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={10}
                y1={10}
                x2={10}
                y2={40}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#23D2C3" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#01BCAD" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Promo;
