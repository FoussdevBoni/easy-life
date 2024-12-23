import * as React from "react";
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Languages = (props) => (
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
            d="M10 20.805c.03 5.496 4.504 9.93 10 9.912 5.496.018 9.97-4.416 10-9.912 0-5.523-4.477-10-10-10s-10 4.477-10 10Zm5.358-6.855a8.358 8.358 0 0 1 4.354-1.39c.306.443.681.835 1.11 1.16.169.131.352.242.546.331.256.108.488.267.68.468a1 1 0 0 1 .1.654c-.007.08-.007.153-.007.22a1.275 1.275 0 0 0 1.4 1.275h.148a17.83 17.83 0 0 0 3.011-.749 8.133 8.133 0 0 1 1.633 4.886 8.336 8.336 0 0 1-13.784 6.235l.01-.013a.153.153 0 0 0 .012-.017c1.372-2.286.511-3.683-.128-4.312a5.89 5.89 0 0 0-.562-.47v-.001c-.517-.398-.859-.661-.859-1.42 0-.36.2-.5 1.2-.837a3.914 3.914 0 0 0 1.962-1.142c1.163-1.49-.116-3.788-.384-4.234a7.464 7.464 0 0 0-.442-.644Z"
            fill="url(#b)"
        />
        <Path
            d="M22.928 18.248a4.29 4.29 0 0 0-3.336 1.54 2.2 2.2 0 0 0-.376 2.011c.401.967.472 2.039.2 3.05a1.87 1.87 0 0 0 1.1 2.5c.266.105.55.158.835.156a5.022 5.022 0 0 0 3.287-1.7 6.323 6.323 0 0 0 2.04-4.266 3.537 3.537 0 0 0-3.75-3.29Z"
            fill="url(#c)"
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
                <Stop stopColor="#6C4DDA" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#522ED2" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={10}
                y1={10.805}
                x2={10}
                y2={30.717}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#6C4DDA" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#522ED2" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={19.118}
                y1={18.241}
                x2={19.118}
                y2={27.505}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#6C4DDA" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#522ED2" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Languages;
