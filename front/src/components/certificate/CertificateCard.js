import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CertificateCard({ certificate, isEditable, setIsEditing, setCertificates }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const owner = certificate.owner;
    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`cer/${certificate.owner}`);
        const res = await Api.get(`users/${owner}/cer`);
        setCertificates(res.data);
      }
    } catch (err) {
      alert("삭제 중 오류가 발생했습니다.", err);
    }
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {certificate.name}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.acquisitionDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
            <Button
                variant="outline-danger"
                size="sm"
                className="mr-3"
                onClick={handleDelete}
              >
                삭제
              </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
