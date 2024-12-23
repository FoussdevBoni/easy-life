import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Mail = (props) => (
    <Svg
        width={19}
        height={15}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.826 0h14.61a1.832 1.832 0 0 1 1.826 1.826v10.958a1.832 1.832 0 0 1-1.826 1.826H1.826A1.832 1.832 0 0 1 0 12.784L.009 1.826A1.824 1.824 0 0 1 1.826 0Zm7.305 8.219 7.305-4.566V1.826L9.131 6.392 1.826 1.826v1.827l7.305 4.566Z"
            fill="#374f71"
        />
    </Svg>
);

export default Mail;
