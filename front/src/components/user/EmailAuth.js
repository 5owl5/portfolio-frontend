import React, { useState } from "react";
import * as Api from "../../api";

import { Row, Col, Form, Button } from "react-bootstrap";

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
    <Row>
      <Col lg={4}>
      {randomNumber ? (
        <Form.Group className="mt-3 text-center">
          <Form.Control
            type="text"
            placeholder="인증번호를 입력하세요"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            disabled={isEmailAuth}
          />
          <Col className="mt-3 text-center">
            <Button onClick={hanleClickAuth} variant="primary">
              인증
            </Button>
          </Col>
        </Form.Group>
      ) : (
        <Form.Group className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button class="emailAuth" onClick={handleClickSend} variant="primary">
              인증코드 전송
            </Button>
          </Col>
        </Form.Group>
      )}
      </Col>
      </Row>
    </>
  );
}

export default EmailAuthForm;
