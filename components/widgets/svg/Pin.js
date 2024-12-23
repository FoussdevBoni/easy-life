import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

const Pin = (props) => (
    <Svg
        width={19}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            clipRule="evenodd"
            d="M14.453 6.055c0 3.12-5.055 8.214-5.055 8.214S4.343 9.174 4.343 6.055A5.008 5.008 0 0 1 9.398 1a5.008 5.008 0 0 1 5.055 5.055Z"
            stroke="#262B2E"
            strokeWidth={2}
            strokeLinecap="square"
        />
        <Circle
            cx={9.398}
            cy={6.055}
            r={1.445}
            stroke="#262B2E"
            strokeWidth={2}
            strokeLinecap="square"
        />
        <Path
            d="M13.73 12.904c2.174.386 3.61 1.055 3.61 1.816 0 1.196-3.556 2.166-7.942 2.166-4.387 0-7.943-.97-7.943-2.166 0-.761 1.437-1.43 3.61-1.816"
            stroke="#262B2E"
            strokeWidth={2}
        />
    </Svg>
);

export default Pin;
