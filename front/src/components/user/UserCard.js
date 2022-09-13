import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import ShareService from "./ShareService";
import { useState } from "react";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const HOST = process.env.REACT_APP_HOST;
  Api.get(`users/${user?.id}/image`).then((res) => {
    if (!res.data.fileName) {
      setImage(null);
      return;
    }

    const filename = `http://${HOST}:5001/img/${res.data.fileName}`;
    setImage(filename);
  });

  return (
    <Card className="mb-3 ms-3 mr-5" style={{ width: "18rem" }}>
      <link
        href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        rel="stylesheet"
        type="text/css"
      />
      <Card.Body>
        <div className="image-wrap">
          <Card.Img
            className="mb-3"
            src={image ?? `http://${HOST}:5001/img/default.png`}
            alt="프로필 사진"
          />
        </div>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
                <br />
                <br />
                <ShareService></ShareService>
              </Col>
            </Row>
          </Col>
        )}
        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
