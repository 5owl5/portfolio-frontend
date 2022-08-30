import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { darkState, lightState, modeState } from "../atoms/theme";
import { IoMoon, IoSunnySharp } from "react-icons/io5";

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
      {theme.mode === "dark" ? (
        <IoMoon style={{ color: "white" }} />
      ) : (
        <IoSunnySharp />
      )}
    </ToggleBtnWrapper>
  );
}

const ToggleBtnWrapper = styled.button`
  positin: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 3%;

  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    background-color: ${(props) => props.theme.btnBorder};
    transition: 0.5s;
  }
  border: ${(props) => props.theme.btnBorder};

  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default ThemeToggleBtn;
