import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const CheckThree = (props) => (
    <Svg
        width={18}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={9} cy={8.5} r={8.333} fill="#374f71" />
        <Path
            d="M7.798 11a.416.416 0 0 1-.277-.102l-2.406-2.15a.325.325 0 0 1 0-.496.416.416 0 0 1 .278-.103c.104 0 .204.037.278.103l2.127 1.9 4.532-4.05A.416.416 0 0 1 12.607 6c.105 0 .205.037.278.103a.325.325 0 0 1 0 .496l-4.813 4.299a.416.416 0 0 1-.274.102Z"
            fill="#fff"
        />
    </Svg>
);

export default CheckThree;
