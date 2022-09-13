import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(8);
  const showMoreCards = () => {
    setVisible((preValue) => preValue + 8);
  };
  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Row xs="auto" id="network-wrap" className="jusify-content-center">
        {users.slice(0, visible).map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
      {visible < users.length ? (
        <Button id="showMore-btn" className="mt-3 mb-5" onClick={showMoreCards}>
          더보기
        </Button>
      ) : null}
    </Container>
  );
}

export default Network;
