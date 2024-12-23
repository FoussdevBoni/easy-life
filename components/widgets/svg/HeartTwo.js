import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HeartTwo = (props) => (
    <Svg
        width={28}
        height={28}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M28 14c0 7.732-6.268 14-14 14S0 21.732 0 14 6.268 0 14 0a14 14 0 0 1 14 14Z"
            fill="#FE2121"
        />
        <Path
            d="M15.021 8.552a4.027 4.027 0 0 0-1.477 1.5A4.028 4.028 0 0 0 10.032 8 4.262 4.262 0 0 0 6 12.292c0 5.593 7.544 9.495 7.544 9.495s7.544-3.9 7.544-9.495A4.262 4.262 0 0 0 17.055 8c-.715 0-1.417.19-2.034.552Z"
            fill="#fff"
        />
    </Svg>
);

export default HeartTwo;
