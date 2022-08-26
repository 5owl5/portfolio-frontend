import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, setIsEditing }) {

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
        <Col xs lg="1">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="mr-3"
          >
            편집
          </Button>
          <Button
              variant="outline-danger"
              size="sm"
              className="mr-3"
            >
              삭제
            </Button>
        </Col>
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
