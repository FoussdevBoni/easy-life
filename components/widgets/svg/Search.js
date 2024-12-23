import * as React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";

const Search = (props) => (
    <Svg
        width={17}
        height={17}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m16 15.224-4.46-4.42"
            stroke="#BDBDBD"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Ellipse
            cx={7.565}
            cy={6.863}
            rx={5.623}
            ry={5.574}
            stroke="#BDBDBD"
            strokeWidth={2}
            strokeLinecap="square"
        />
    </Svg>
);

export default Search;
