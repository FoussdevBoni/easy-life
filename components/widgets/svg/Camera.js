import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Camera = (props) => (
    <Svg
        width={36}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36 28.125a3.376 3.376 0 0 1-3.375 3.375H3.375A3.376 3.376 0 0 1 0 28.125V7.875A3.376 3.376 0 0 1 3.375 4.5h6.188l.865-2.313A3.37 3.37 0 0 1 13.584 0h8.824a3.37 3.37 0 0 1 3.157 2.187l.872 2.313h6.188A3.376 3.376 0 0 1 36 7.875v20.25ZM26.438 18a8.438 8.438 0 1 0-16.876 0 8.438 8.438 0 0 0 16.876 0Zm-6.07 5.718A6.188 6.188 0 0 0 24.189 18 6.2 6.2 0 0 0 18 11.813a6.188 6.188 0 1 0 2.369 11.905Z"
            fill="#a6bbd3"
        />
    </Svg>
);

export default Camera;
