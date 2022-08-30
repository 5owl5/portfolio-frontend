import React, { useState } from "react";
import * as Api from "../../api";

function EmailAuthForm({ email, isEmailAuth, setIsEmailAuth }) {
  const [randomNumber, setRandomNumber] = useState(null);
  const [inputNumber, setInputNumber] = useState(null);

  const handleClickSend = async (e) => {
    e.preventDefault();

    try {
      await Api.post("user/register/emailAuth", { email }).then((res) =>
        setRandomNumber(res.data)
      );
    } catch (err) {
      console.log("인증에 실패했습니다.");
    }
  };

  const hanleClickAuth = async (e) => {
    e.preventDefault();

    const validEmail = Number(randomNumber) === Number(inputNumber);

    if (validEmail) {
      alert("인증이 완료 됐습니다.");
      setIsEmailAuth(validEmail);
    } else {
      alert("인증코드를 다시 한번 확인해주세요.");
    }
  };

  return (
    <>
      {randomNumber ? (
        <form>
          <input
            type="text"
            placeholder="인증번호를 입력하세요"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            disabled={isEmailAuth}
          ></input>
          <button onClick={hanleClickAuth}>인증</button>
        </form>
      ) : (
        <button class="emailAuth" onClick={handleClickSend}>
          인증코드 전송
        </button>
      )}
    </>
  );
}

export default EmailAuthForm;
