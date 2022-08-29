import { atom } from "recoil";

// light mode
export const lightState = atom({
  key: "light",
  default: {
    mode: "light",
    bgColor: "#F8F7F4",
    textColor: "#31302E",
    borderColor: "1px solid #eaeaea",
  },
});

// dark mode
export const darkState = atom({
  key: "dark",
  default: {
    mode: "dark",
    bgColor: "#383737",
    textColor: "white",
    borderColor: "1px solid #2c2d33",
  },
});

// 현재 mode 상태
export const modeState = atom({
  key: "isMode",
  default: lightState,
});
