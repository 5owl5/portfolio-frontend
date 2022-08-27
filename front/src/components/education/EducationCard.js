import { Card, Button, Row, Col } from "react-bootstrap";
import React from "react";

function EducationCard({ education, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="mb-4">
        <Col>
          {education.name}
          <br />
          <span className="text-muted">{education.description}</span>
          <br />
          <span className="text-muted">{education.acquisitionDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-3"
            >
              편집
            </Button>
            <Button variant="outline-danger" size="sm" className="mr-3">
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
