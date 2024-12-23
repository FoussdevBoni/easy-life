import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Store = (props) => (
    <Svg
        width={40}
        height={41}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Rect
            opacity={0.1}
            y={0.982}
            width={40}
            height={39.646}
            rx={19.823}
            fill="url(#a)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.416 29.726a.9.9 0 0 0 .584.248.9.9 0 0 0 .583-.248c.452-.447 4.417-4.451 4.417-7.268a4.93 4.93 0 0 0-5-4.956 4.931 4.931 0 0 0-5 4.956c0 2.817 3.965 6.82 4.416 7.268Zm-1.053-7.264A1.652 1.652 0 0 1 25 20.802a1.662 1.662 0 0 1 1.667 1.656 1.652 1.652 0 0 1-3.304.005Z"
            fill="url(#b)"
        />
        <Path
            d="M15 19.894a2.72 2.72 0 0 0 2.083.91c.567-.001 1.12-.176 1.583-.5A6.672 6.672 0 0 1 25 15.85a7.155 7.155 0 0 1 2.917.661l-3-5.2a.877.877 0 0 0-.75-.417h-10a.877.877 0 0 0-.75.413l-3.334 5.782a.74.74 0 0 0-.083.413c0 1.982 1.167 3.3 2.917 3.3A2.72 2.72 0 0 0 15 19.894Z"
            fill="url(#c)"
        />
        <Path
            d="M18.333 22.462v-.17c-.41.097-.829.154-1.25.17a4.55 4.55 0 0 1-2.083-.5 4.551 4.551 0 0 1-2.083.5H12.5v5.777a.784.784 0 0 0 .833.823h8.25c-1.5-1.731-3.25-4.374-3.25-6.6Z"
            fill="url(#d)"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={0}
                y1={0.982}
                x2={0}
                y2={40.628}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE00D" />
                <Stop offset={1} stopColor="#FEA127" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={20}
                y1={17.502}
                x2={20}
                y2={29.974}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE00D" />
                <Stop offset={1} stopColor="#FEA127" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={9.997}
                y1={10.894}
                x2={9.997}
                y2={20.804}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE00D" />
                <Stop offset={1} stopColor="#FEA127" />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={12.499}
                y1={21.962}
                x2={12.499}
                y2={29.064}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#FFE00D" />
                <Stop offset={1} stopColor="#FEA127" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Store;
