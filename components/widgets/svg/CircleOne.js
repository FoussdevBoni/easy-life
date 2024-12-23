import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CircleOne = (props) => (
    <Svg
        width={214}
        height={193}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            opacity={0.04}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48 193c91.679 0 166-74.321 166-166 0-9.194-.747-18.213-2.185-27H30C13.431 0 0 13.431 0 30v155.955C15.196 190.537 31.31 193 48 193Z"
            fill="#fff"
        />
    </Svg>
);

export default CircleOne;
