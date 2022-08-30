import { atom } from "recoil";

// light mode
export const lightState = atom({
  key: "light",
  default: {
    mode: "light",
    // bgColor: "#ffffff",
    // bgColor2: "#f4f7f9",
    bgColor: "#F8F9FA",
    bgColor2: "#ffffff",
    textColor: "#31302E",
    btnBorder: "1px solid #eaeaea",
  },
});

// dark mode
export const darkState = atom({
  key: "dark",
  default: {
    mode: "dark",
    // bgColor: "#111111",
    // bgColor2: "#1c1d22",
    // bgColor: "#141319",
    bgColor: "#121212",
    bgColor2: "#1e1e1e",
    textColor: "#ECECEC",
    btnBorder: "0.5px solid #2c2d33",
  },
});

// 현재 mode 상태
export const modeState = atom({
  key: "isMode",
  default: lightState,
});
