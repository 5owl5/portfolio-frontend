import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { modeState } from "../atoms/theme";

const GlobalCss = () => {
  const current = useRecoilValue(modeState);
  const bgColor = current.bgColor;
  const textColor = current.textColor;
  return <GlobalStyle bgColor={bgColor} textColor={textColor} />;
};

const GlobalStyle = createGlobalStyle`
  body, .card {
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
    border: 1px solid ${(props) => props.textColor};
  }
`;

export default GlobalCss;
