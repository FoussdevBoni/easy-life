import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Add = (props) => (
    <Svg
        width={17}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M8.282 5.5v6m-3-3h6m4.5 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
            stroke="#a6bbd3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default Add;
