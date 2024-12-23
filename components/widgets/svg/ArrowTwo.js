import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowTwo = (props) => (
    <Svg
        width={7}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M6.49 6.334 1.045.393a.578.578 0 0 0-.866 0 .71.71 0 0 0 0 .943l5.014 5.469-5.012 5.47a.71.71 0 0 0 0 .943.578.578 0 0 0 .866 0l5.444-5.941a.718.718 0 0 0-.001-.943Z"
            fill="#a6bbd3"
        />
    </Svg>
);

export default ArrowTwo;
