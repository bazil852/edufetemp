import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export const Tab1Icon = ({ color, stroke = "#141414" }) => (
  <Svg
    height="24"
    width="24"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G clipPath="url(#clip0_1965_59)">
      <Path
        d="M9.75 20.2501V14.2501H14.25V20.2501H20.25V11.2501C20.2501 11.1516 20.2307 11.054 20.1931 10.963C20.1555 10.8719 20.1003 10.7892 20.0306 10.7195L12.5306 3.21948C12.461 3.14974 12.3783 3.09443 12.2872 3.05668C12.1962 3.01894 12.0986 2.99951 12 2.99951C11.9014 2.99951 11.8038 3.01894 11.7128 3.05668C11.6217 3.09443 11.539 3.14974 11.4694 3.21948L3.96938 10.7195C3.89975 10.7892 3.84454 10.8719 3.8069 10.963C3.76926 11.054 3.74992 11.1516 3.75 11.2501V20.2501H9.75Z"
        stroke={stroke}
        fill={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1965_59">
        <Rect height="24" width="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
