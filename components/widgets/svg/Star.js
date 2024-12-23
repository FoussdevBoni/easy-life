import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Star = (props) => (
    <Svg
        width={13}
        height={13}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="m6.887 10.567-3.733 1.961.715-4.156L.846 5.43l4.173-.606L6.887.985l1.868 3.84 4.173.605-3.023 2.944.713 4.154-3.731-1.96Z"
            fill="#FFC529"
        />
    </Svg>
);

export default Star;
