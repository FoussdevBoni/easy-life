import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const BasketTwo = (props) => (
    <Svg
        width={57}
        height={57}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle opacity={0.1} cx={28.5} cy={28.5} r={28.5} fill="#FE2121" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.5 18.5H32v3H14v-3h4.5L20 17h6l1.5 1.5ZM15.5 38a3.009 3.009 0 0 0 3 3h9a3.009 3.009 0 0 0 3-3V23h-15v15Zm18-15H44v3H33.5v-3Zm0 12h6v3h-6v-3Zm9-6h-9v3h9v-3Z"
            fill="#FE2121"
        />
    </Svg>
);

export default BasketTwo;
