import React, { useState } from "react";
import { Button, Form, Card, Col, Row, InputGroup } from "react-bootstrap";
import * as Api from "../../api";
import swal from "sweetalert";
import axios from "axios";
function UserEditForm({ user, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const [file, setFile] = useState();
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    const HOST = process.env.REACT_APP_HOST;
    e.preventDefault();
    try {
      if (file) {
        const formData = new FormData();
        formData.append("userimages", file);
        await axios.put(`http://${HOST}:5001/image`, formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
        swal("이미지가 업로드 되었습니다", "당신은 훈훈 그 자체!", "success");
      }
    } catch (error) {
      swal("이미지 업로드 실패", "용량 제한은 20MB입니다", "error");
    }
    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <InputGroup className="input-group mb-3">
          <label htmlFor="img"></label>
          <input type="file" onChange={onFileChange} />
        </InputGroup>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="info" type="submit" size="sm">
                확인
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                size="sm"
              >
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
