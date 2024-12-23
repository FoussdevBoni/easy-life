import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Clock = (props) => (
    <Svg
        width={17}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle opacity={0.1} cx={8.5} cy={8.5} r={8.5} fill="#374f71" />
        <Path
            clipRule="evenodd"
            d="M13.591 8.8a4.8 4.8 0 1 1-9.6 0 4.8 4.8 0 0 1 9.6 0Z"
            stroke="#374f71"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M8.796 5.918v2.877l1.918.959"
            stroke="#374f71"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default Clock;
