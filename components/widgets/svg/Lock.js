import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Lock = (props) => (
    <Svg
        width={18}
        height={20}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.906 8.334h.892a1.786 1.786 0 0 1 1.79 1.786v7.144c0 .986-.8 1.786-1.786 1.786h-13.1c-.986 0-1.786-.8-1.786-1.786V10.12c0-.986.8-1.786 1.786-1.786h.893V5.655a5.656 5.656 0 0 1 11.311 0v2.679Zm-8.335 0h5.358V5.655a2.679 2.679 0 1 0-5.358 0v2.679Z"
            fill="#374f71"
        />
    </Svg>
);

export default Lock;
