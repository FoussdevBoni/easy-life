import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Plus = (props) => (
    <Svg
        width={8}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M4.77 6.307h2.227v1.3H4.771v2.538H3.388V7.607H1.149v-1.3h2.239V3.934H4.77v2.373Z"
            fill="#fff"
        />
    </Svg>
);

export default Plus;
