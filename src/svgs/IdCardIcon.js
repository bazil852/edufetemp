import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export const IdCardIcon = ({ width = 24, height = 24 }) => (
  <Svg
    height={height}
    width={width}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_173_976)">
      <Path
        d="M14.25 10.5H18"
        stroke="#114A55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        d="M14.25 13.5H18"
        stroke="#114A55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        d="M20.25 4.5H3.75C3.33579 4.5 3 4.83579 3 5.25V18.75C3 19.1642 3.33579 19.5 3.75 19.5H20.25C20.6642 19.5 21 19.1642 21 18.75V5.25C21 4.83579 20.6642 4.5 20.25 4.5Z"
        stroke="#114A55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        d="M9 13.5C10.2426 13.5 11.25 12.4926 11.25 11.25C11.25 10.0074 10.2426 9 9 9C7.75736 9 6.75 10.0074 6.75 11.25C6.75 12.4926 7.75736 13.5 9 13.5Z"
        stroke="#114A55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        d="M6 15.75C6.33281 14.4562 7.60219 13.5 9 13.5C10.3978 13.5 11.6681 14.4553 12 15.75"
        stroke="#114A55"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_173_976">
        <Rect height="24" width="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
