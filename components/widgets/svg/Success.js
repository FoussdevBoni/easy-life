import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Success = (props) => (
    <Svg
        width={194}
        height={194}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={97} cy={97} r={97} fill="#374f71" />
        <Path
            d="M84.524 111.741 68.381 95.6 63 100.979 84.524 122.5l46.121-46.119-5.38-5.381-40.741 40.741Z"
            fill="#fff"
        />
    </Svg>
);

export default Success;
