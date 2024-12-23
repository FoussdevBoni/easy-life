import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Terms = (props) => (
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
            d="M23.232 21.525a.807.807 0 0 0-1.12.01.783.783 0 0 0-.015 1.107l2.26 2.228-1.054 1.04-2.256-2.228a.807.807 0 0 0-1.35.35.784.784 0 0 0 .22.771l2.045 2.017a4.082 4.082 0 0 1-1.825.3 2.8 2.8 0 0 1-.64 1.518c.3.05.604.077.908.08a5.622 5.622 0 0 0 3.96-1.615l1.686-1.69a.783.783 0 0 0 0-1.116l-2.819-2.772Z"
            fill="url(#b)"
        />
        <Path
            d="M11.46 21.086c.239-.23.516-.417.818-.553a4.732 4.732 0 0 1 .167-5.163 4.869 4.869 0 0 1 4.823-2l.346-.342c.34-.335.71-.637 1.108-.9a6.505 6.505 0 0 0-7.31 1.987 6.31 6.31 0 0 0-.353 7.48c.114-.184.249-.355.401-.509Z"
            fill="url(#c)"
        />
        <Path
            d="M12.03 21.65a2.1 2.1 0 0 1 2.95-.005l3.771 3.725a2.05 2.05 0 0 1 .006 2.923l-.005-.005a2.1 2.1 0 0 1-2.952.003l-3.77-3.725a2.05 2.05 0 0 1-.006-2.923l.006.006Z"
            fill="url(#d)"
        />
        <Path
            d="M27.312 13.588a6.514 6.514 0 0 0-9.13 0l-3.71 3.662.565.56c.98.96 2.55.96 3.531 0l1.435-1.416 6.74 6.775.57-.564a6.321 6.321 0 0 0 0-9.018v.001Z"
            fill="url(#e)"
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
                <Stop stopColor="#466FFF" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#3462FF" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={19.497}
                y1={21.304}
                x2={19.497}
                y2={28.717}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#466FFF" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#3462FF" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={9.999}
                y1={11.72}
                x2={9.999}
                y2={21.595}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#466FFF" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#3462FF" />
            </LinearGradient>
            <LinearGradient
                id="d"
                x1={13.524}
                y1={20.143}
                x2={10.565}
                y2={23.102}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#466FFF" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#3462FF" />
            </LinearGradient>
            <LinearGradient
                id="e"
                x1={14.471}
                y1={11.721}
                x2={14.471}
                y2={23.169}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#466FFF" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#3462FF" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Terms;
