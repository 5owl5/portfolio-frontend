import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { modeState } from "../atoms/theme";

const GlobalCss = () => {
  const current = useRecoilValue(modeState);
  const bgColor = current.bgColor;
  const bgColor2 = current.bgColor2;
  const textColor = current.textColor;
  return (
    <GlobalStyle bgColor={bgColor} bgColor2={bgColor2} textColor={textColor} />
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
  }
  .card {
    background-color: ${(props) => props.bgColor2};
    border: none;
  }
  h2, a {
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
  }

  .navbar-light .navbar-nav .nav-link {
    color: ${(props) => props.textColor};
  }
  .navbar-light .navbar-nav .nav-link:focus {
    color: ${(props) => props.textColor};
  }
  
  .form-control {
    background-color: ${(props) => props.bgColor};
    color: #acacac;    
    border: none;
    line-height: 2;
    border-radius: 0.5rem;
  }

  .form-check-input {
    background-color: ${(props) => props.bgColor};
  }

  div.mb-4.row {
  border-bottom: 0.0625rem solid ${(props) => props.bgColor};
  }
`;

export default GlobalCss;
