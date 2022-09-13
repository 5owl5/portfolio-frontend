import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { lightMode, darkMode, modeState } from "../atoms/theme";
import { IoMoon, IoSunnySharp } from "react-icons/io5";

function ThemeToggleBtn() {
  const [mode, setMode] = useRecoilState(modeState);

  const toggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  useEffect(() => {
    document.documentElement.setAttribute("theme", mode);
    window.localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <ToggleBtnWrapper
      mode={mode === "light" ? lightMode : darkMode}
      onClick={toggle}
    >
      {mode === "dark" ? (
        <IoMoon style={{ color: "white" }} />
      ) : (
        <IoSunnySharp />
      )}
    </ToggleBtnWrapper>
  );
}

const ToggleBtnWrapper = styled.button`
  positin: fixed;
  bottom: 4%;
  right: 3%;

  background-color: ${(props) => props.mode.bgColor};
  &:hover {
    background-color: ${(props) => props.mode.btnBorder.split(" ")[2]};
  }
  border: none;
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default ThemeToggleBtn;
