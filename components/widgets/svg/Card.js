import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Card = (props) => (
    <Svg
        width={31}
        height={31}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={15.5} cy={15.5} r={15.5} fill="#374f71" />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 11.173v.435h17.12v-.435A2.159 2.159 0 0 0 21.98 9H9.14A2.159 2.159 0 0 0 7 11.173Zm0 8.018a2.159 2.159 0 0 0 2.14 2.173h12.84a2.16 2.16 0 0 0 2.14-2.173v-5.65H7v5.65Zm13.56-.512a.95.95 0 0 1-.96-.936.959.959 0 0 1 .951-.966.951.951 0 0 1 .01 1.902Zm-3.338-.936a.95.95 0 1 0 .951-.966.959.959 0 0 0-.948.966h-.003Z"
            fill="#fff"
        />
    </Svg>
);

export default Card;
