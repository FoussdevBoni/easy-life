import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowThree = (props) => (
    <Svg
        width={8}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M0 1.5 1.5 0 8 6.5 1.5 13 0 11.5l5-5-5-5Z"
            fill="#000"
            fillOpacity={0.25}
        />
    </Svg>
);

export default ArrowThree;
