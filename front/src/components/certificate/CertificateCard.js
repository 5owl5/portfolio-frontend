import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {

  const certificateDate = certificate.acquisitionDate.split("T")[0];

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {certificate.name}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificateDate}</span>
      </Col>
      {isEditable && (
        <Col xs lg="1">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="mr-3"
            style={{
              position: "absolute",
              right: 0,
              marginRight: "30px",
            }}
          >
            편집
          </Button>
        </Col>
      )}

      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
