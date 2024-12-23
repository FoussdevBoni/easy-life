import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const PinTwo = (props) => (
    <Svg
        width={14}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            clipRule="evenodd"
            d="M10.818 4.818c0 2.356-3.818 6.2-3.818 6.2s-3.818-3.843-3.818-6.2A3.783 3.783 0 0 1 7 1a3.783 3.783 0 0 1 3.818 3.818Z"
            stroke="#374f71"
            strokeLinecap="square"
        />
        <Circle
            cx={7}
            cy={4.818}
            r={1.091}
            stroke="#374f71"
            strokeLinecap="square"
        />
        <Path
            d="M10.273 9.992c1.642.292 2.727.8 2.727 1.372 0 .9-2.686 1.636-6 1.636s-6-.732-6-1.636c0-.572 1.085-1.08 2.727-1.372"
            stroke="#374f71"
        />
    </Svg>
);

export default PinTwo;
