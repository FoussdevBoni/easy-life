import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CircleTwo = (props) => (
    <Svg
        width={260}
        height={139}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            opacity={0.04}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0h229.815c16.569 0 30 13.431 30 30v78.442c-27.102 19.244-60.229 30.558-96 30.558C81.33 139 12.895 78.838 0 0Z"
            fill="#fff"
        />
    </Svg>
);

export default CircleTwo;
