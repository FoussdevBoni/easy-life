import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Triangle = (props) => (
    <Svg
        width={147}
        height={254}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            opacity={0.1}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 254h147L0 0v254Z"
            fill="#fff"
        />
    </Svg>
);

export default Triangle;
