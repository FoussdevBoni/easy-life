import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Basket = (props) => (
    <Svg
        width={28}
        height={26}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m24.769 15.12 2.217-9.756a1.126 1.126 0 0 0-1.098-1.377H7.467l-.43-2.1a1.126 1.126 0 0 0-1.1-.9H1.126C.504.987 0 1.491 0 2.113v.75a1.126 1.126 0 0 0 1.126 1.124H4.4l3.3 16.11a2.627 2.627 0 1 0 3.144.4h9.832a2.626 2.626 0 1 0 2.983-.489l.259-1.139a1.126 1.126 0 0 0-1.1-1.375H10.23l-.307-1.5h13.748c.525 0 .98-.363 1.098-.875Z"
            fill="#374f71"
        />
    </Svg>
);

export default Basket;
