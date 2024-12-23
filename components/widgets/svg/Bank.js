import * as React from "react";
import Svg, {
    Circle,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";

const Bank = (props) => (
    <Svg
        width={35}
        height={36}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle opacity={0.1} cx={17.5} cy={18} r={17.5} fill="url(#a)" />
        <Path
            d="M26.985 26.188h-.869v-6.95h-1.738v6.95H20.9v-6.95h-1.735v6.95h-3.476v-6.95h-1.738v6.95h-3.475v-6.95H8.738v6.95h-.869a.869.869 0 1 0 0 1.738h19.116a.869.869 0 0 0 0-1.738Z"
            fill="url(#b)"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.302 17.5h19.25a.893.893 0 0 0 .876-.909v-2.726a.914.914 0 0 0-.456-.8L18.347 7.61a.851.851 0 0 0-.839 0l-9.625 5.453a.913.913 0 0 0-.456.8v2.728c-.009.492.383.9.875.91Zm7.875-4.546a1.787 1.787 0 0 1 1.75-1.818c.985.02 1.767.833 1.75 1.818a1.751 1.751 0 1 1-3.5 0Z"
            fill="url(#c)"
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
                <Stop stopColor="#6C4DDA" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#522ED2" />
            </LinearGradient>
            <LinearGradient
                id="b"
                x1={7}
                y1={19.237}
                x2={7}
                y2={27.926}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#6C4DDA" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#522ED2" />
            </LinearGradient>
            <LinearGradient
                id="c"
                x1={7.427}
                y1={7.5}
                x2={7.427}
                y2={17.5}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#6C4DDA" stopOpacity={0.6} />
                <Stop offset={1} stopColor="#522ED2" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default Bank;
