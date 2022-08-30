import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function updateToken() {
  if (localStorage.getItem("refreshToken")) {
    console.log("리프레시토큰이 있음");
    let refreshedAccessTokenResponse = await fetch(serverUrl + "token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    });
    console.log("token 요청 보내는중");
    let refreshedAccessToken = await refreshedAccessTokenResponse.json();
    if (refreshedAccessToken.Logout) {
      console.log("로그아웃되야됨");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      window.location.reload();
    } else {
      sessionStorage.setItem("accessToken", refreshedAccessToken.accessToken);
      localStorage.setItem("refreshToken", refreshedAccessToken.refreshToken);
    }
  }
}

axios.interceptors.response.use(
  async function (response) {
    console.log("interceptors");
    console.log(response);
    if (response.data.token_data) {
      console.log("interceptors2");
      let refinedData = response.data.data;
      let tokenData = response.data.token_data;
      console.log(tokenData);
      console.log(refinedData);
      if (tokenData.errorMessage) {
        console.log("과연?");
        console.log(tokenData.errorMessage);
        let refreshedAccessTokenResponse = await fetch(serverUrl + "token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.getItem("refreshToken"),
          }),
        });
        console.log("token 요청 보내는중");
        let refreshedAccessToken = await refreshedAccessTokenResponse.json();
        console.log("refreshedAccessToken");
        console.log(refreshedAccessToken.logout);
        if (refreshedAccessToken.logout === true) {
          console.log("로그아웃되야됨");
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.reload();
        } else {
          sessionStorage.setItem(
            "accessToken",
            refreshedAccessToken.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            refreshedAccessToken.refreshToken
          );
          console.log(localStorage.getItem("refreshToken"));
          console.log(sessionStorage.getItem("accessToken"));
          console.log("지나옴");
        }
      }

      response.data = refinedData;
    }
    console.log("interceptors3");
    return response;
  },
  async (error) => {
    // 오류 응답 처리
    if (error.response.status === 490) {
      console.log("490 검출");
      let refreshedAccessTokenResponse = await fetch(serverUrl + "token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      });
      console.log("token 요청 보내는중");
      let refreshedAccessToken = await refreshedAccessTokenResponse.json();
      console.log("refreshedAccessToken");
      console.log(refreshedAccessToken);
      if (refreshedAccessToken.logout) {
        console.log("로그아웃되야됨");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        window.location.reload();
      } else {
        sessionStorage.setItem("accessToken", refreshedAccessToken.accessToken);
        console.log("지나옴");
      }
    }
    console.log(error);
    return Promise.reject(error);
  }
);
async function get(endpoint, params = "") {
  console.log(
    `%cGET 요청 ${serverUrl + endpoint + "/" + params}`,
    "color: #a25cd1;"
  );

  return axios.get(serverUrl + endpoint + "/" + params, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function put(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = "") {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(serverUrl + endpoint + "/" + params, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { get, post, put, del as delete, updateToken };
