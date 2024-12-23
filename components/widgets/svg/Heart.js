import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Heart = ({ fillColor, strokeColor }) => (
    <Svg width={18} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            d="m8.878 16-1.186-1.075C3.482 11.104.703 8.582.703 5.495A4.447 4.447 0 0 1 5.199 1a4.905 4.905 0 0 1 3.68 1.705A4.905 4.905 0 0 1 12.558 1a4.447 4.447 0 0 1 4.495 4.496c0 3.082-2.784 5.608-6.99 9.43L8.879 16Z"
            fill={fillColor}
            stroke={strokeColor}
        />
    </Svg>
);

export default Heart;
