import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { lightMode, darkMode, modeState } from "../atoms/theme";

const GlobalCss = () => {
  const curMode = useRecoilValue(modeState);
  return <GlobalStyle mode={curMode === "light" ? lightMode : darkMode} />;
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.mode.bgColor};
    color: ${(props) => props.mode.textColor};
  }

  #signIn {
    font-size: 25px;
    color: color: ${(props) => props.mode.textColor};
  }

  .input-form{
    background-color: ${(props) => props.mode.bgColor2};
    border: none;
    border-radius: 1rem;
    box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
    padding: 2rem 3rem;
  }
  .card {
    background-color: ${(props) => props.mode.bgColor2};
    border: none;
  }
  h2, a.nav-link {
    background-color: ${(props) => props.mode.bgColor};
    color: ${(props) => props.mode.textColor};
  }

  .navbar-light .navbar-nav .nav-link, .navbar-light .navbar-nav .nav-link:focus{
    color: ${(props) => props.mode.textColor};
  }
  .navbar-light .navbar-nav .nav-link:hover {
    color: ${(props) => props.mode.textColor};
    transform: scale(1.1);
  }

  .form-control {
    background-color: ${(props) => props.mode.bgColor};
    color: #acacac;    
    border: none;
    line-height: 2;
    border-radius: 0.5rem;
  }

  .form-check-input {
    background-color: ${(props) => props.mode.bgColor};
  }

  div.mb-4.row {
  border-bottom: 0.0625rem solid ${(props) => props.mode.bgColor};
  }

  .react-datepicker-ignore-onclickoutside {
    background-color: ${(props) => props.mode.bgColor};
    color: #acacac;    
    border: none;
  }
  .react-datepicker__input-container input {
    background-color: ${(props) => props.mode.bgColor};
    color: #acacac;    
    border: none;
    line-height: 2.5;
    border-radius: 0.5rem;
    text-align: center;
    width: 8rem;
  }

  .dropdown-menu a.dropdown-item{
    background-color: ${(props) => props.mode.bgColor};
    color: ${(props) => props.mode.textColor};
    border-bottom: 0.0625rem solid #6c757d;
    font-size: 16px;
    font-weight: 500;
    padding: 0.5rem 0.8rem;
  }
  
  .modal-content{
    background-color: ${(props) => props.mode.bgColor};
    color: ${(props) => props.mode.textColor};
  }

  .modal-body{
    border: none;
    border-bottom: border-bottom: 0.0625rem solid #6c757d;
  }

  @media (max-width: 768px) {
    button.navbar-toggler {
      border: none;
      color: ${(props) => props.mode.textColor};
    }
  }
  
`;

export default GlobalCss;
