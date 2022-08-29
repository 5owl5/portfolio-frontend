import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { darkState, lightState, modeState } from "../atoms/theme";

function ThemeToggleBtn() {
  const lightMode = useRecoilValue(lightState);
  const darkMode = useRecoilValue(darkState);

  // 현재 모드 상태
  const [theme, setTheme] = useRecoilState(modeState);

  const toggle = () => {
    setTheme((curTheme) => (curTheme === lightMode ? darkMode : lightMode));
  };

  return (
    <ToggleBtnWrapper theme={theme} onClick={toggle}>
      {theme.mode === "dark" ? "🌚" : "🌝"}
    </ToggleBtnWrapper>
  );
}

const ToggleBtnWrapper = styled.button`
  positin: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 3%;

  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.btnBorder};
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${(props) =>
    props.mode === "dark"
      ? "0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)"
      : "0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)"};
`;

export default ThemeToggleBtn;
