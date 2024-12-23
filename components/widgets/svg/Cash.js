import * as React from "react";
import Svg, {
    Circle,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";

const Cash = (props) => (
    <Svg
        width={35}
        height={36}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle opacity={0.1} cx={17.5} cy={18} r={17.5} fill="url(#a)" />
        <Path
            d="M27.757 22.69H7.67a.67.67 0 0 0 0 1.34h20.087a.67.67 0 0 0 0-1.34Z"
            fill="url(#b)"
        />
        <Path
            d="M27.757 24.987H7.67a.67.67 0 0 0 0 1.34h20.087a.67.67 0 0 0 0-1.34Z"
            fill="url(#c)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.679 9.5H26.75a1.684 1.684 0 0 1 1.679 1.679v8.5a1.684 1.684 0 0 1-1.679 1.679H8.679A1.684 1.684 0 0 1 7 19.679v-8.5A1.684 1.684 0 0 1 8.679 9.5ZM9.2 19.831h1.722a.67.67 0 1 0 0-1.339H9.2a.67.67 0 1 0 0 1.339Zm1.722-7.461H9.2a.67.67 0 1 1 0-1.339h1.722a.67.67 0 1 1 0 1.339Zm2.966 3.061a3.826 3.826 0 1 0 7.652 0 3.826 3.826 0 0 0-7.652 0Zm12.339 4.4h-1.722a.67.67 0 0 1 0-1.339h1.722a.67.67 0 1 1 0 1.339Zm-1.722-7.461h1.722a.67.67 0 1 0 0-1.339h-1.722a.67.67 0 1 0 0 1.339Z"
            fill="url(#d)"
        />
        <Path
            d="M20.248 15.522a2.535 2.535 0 1 1-5.07 0 2.535 2.535 0 0 1 5.07 0Z"
            fill="url(#e)"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={0}
                y1={0.5}
                x2={0}
                y2={35.5}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#00BCE5" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#02AACF" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={7.026}
                y1={22.691}
                x2={7.026}
                y2={24.03}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#00BCE5" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#02AACF" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={7.026}
                y1={24.987}
                x2={7.026}
                y2={26.326}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#00BCE5" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#02AACF" />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={7}
                y1={9.5}
                x2={7}
                y2={21.358}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#00BCE5" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#02AACF" />
            </LinearGradient>
            <LinearGradient
                id="e"
                x1={15.178}
                y1={12.987}
                x2={15.178}
                y2={18.057}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#00BCE5" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#02AACF" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Cash;
