import { Card, Button, Row, Col } from "react-bootstrap";
import React from "react";
import * as Api from "../../api";

function EducationCard({
  isEditable,
  setIsEditing,
  setEducations,
  currentEducation,
  portfolioOwnerId,
}) {
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`edu/${currentEducation._id}`);
        const res = await Api.get(`users/${portfolioOwnerId}/edu`);
        setEducations(res.data);
      }
    } catch (err) {
      alert("오류가 발생했습니다.", err);
    }
  };

  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          {currentEducation.name}
          <br />
          <span className="text-muted">
            {currentEducation.major} ({currentEducation.present})
          </span>
        </Card.Text>
      </Col>
      {isEditable && (
        <>
          <Col xs="auto">
            <Button variant="info" onClick={() => setIsEditing(true)} size="sm">
              편집
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={handleDelete} size="sm">
              삭제
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
}

export default EducationCard;
