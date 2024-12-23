import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const Filter = (props) => (
    <Svg
        width={17}
        height={16}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M14.76 2H1.426L6.76 8.307v4.36L9.426 14V8.307L14.76 2Z"
                stroke="#a6bbd3"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    transform="translate(.093)"
                    d="M0 0h16v16H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default Filter;
