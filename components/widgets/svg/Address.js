import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

const Address = (props) => (
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
            fill="#FE2121"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.416 30.458c.146.17.36.265.584.259a.742.742 0 0 0 .583-.258 43.573 43.573 0 0 0 3.552-4.288 25.707 25.707 0 0 0 2.319-3.784 8.918 8.918 0 0 0 1.046-3.736 8.059 8.059 0 0 0-.656-3.248A7.563 7.563 0 0 0 20 10.894a7.563 7.563 0 0 0-6.844 4.509 8.059 8.059 0 0 0-.656 3.248 8.918 8.918 0 0 0 1.045 3.735 25.707 25.707 0 0 0 2.319 3.784 43.573 43.573 0 0 0 3.552 4.288Zm-1.219-13.634A2.488 2.488 0 0 1 20 16.065v.001a2.488 2.488 0 0 1 2.5 2.585 2.5 2.5 0 1 1-5 0 2.488 2.488 0 0 1 .697-1.827Z"
            fill="#FE2121"
        />
    </Svg>
);

export default Address;
