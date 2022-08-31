import { atom } from "recoil";

// // light mode
// export const lightState = atom({
//   key: "light",
//   default: {
//     mode: "light",
//     bgColor: "#F8F9FA",
//     bgColor2: "#ffffff",
//     textColor: "#31302E",
//     btnBorder: "1px solid #eaeaea",
//   },
// });

// // dark mode
// export const darkState = atom({
//   key: "dark",
//   default: {
//     mode: "dark",
//     bgColor: "#121212",
//     bgColor2: "#1e1e1e",
//     textColor: "#ECECEC",
//     btnBorder: "0.5px solid #2c2d33",
//   },
// });

// light mode
export const lightMode = {
  mode: "light",
  bgColor: "#F8F9FA",
  bgColor2: "#ffffff",
  textColor: "#31302E",
  btnBorder: "1px solid #eaeaea",
};

// dark mode
export const darkMode = {
  mode: "dark",
  bgColor: "#121212",
  bgColor2: "#1e1e1e",
  textColor: "#ECECEC",
  btnBorder: "0.5px solid #2c2d33",
};

function getTheme() {
  const curTheme = window.localStorage.getItem("theme");
  return curTheme ? curTheme : "light";
  // if (persistedColorPreference) {
  //   return persistedColorPreference;
  // }

  // const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
  // if (systemPreference.matches) {
  //   return "dark";
  // }
  // return "light";
}

// 현재 mode 상태
export const modeState = atom({
  key: "theme",
  default: getTheme(),
});
