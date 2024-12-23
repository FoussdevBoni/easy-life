import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const Minus = (props) => (
    <Svg
        width={5}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path d="M3.617 7.947H.541V6.8h3.076v1.148Z" fill="#374f71" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    transform="translate(.125)"
                    d="M0 0h4v14H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default Minus;
