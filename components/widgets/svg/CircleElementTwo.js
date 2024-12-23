import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const CircleElementTwo = (props) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={6} cy={6} r={6} fill="#F4F5F7" />
    </Svg>
);

export default CircleElementTwo;
