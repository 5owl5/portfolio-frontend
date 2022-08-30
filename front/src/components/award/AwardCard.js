import { Card, Button, Row, Col } from "react-bootstrap";
import convertTime from "../../utils/convertTime";
import * as Api from "../../api";
import React from "react";

const AwardCard = ({
  portfoliOwnerId,
  award,
  setIsEditing,
  isEditable,
  setAwards,
}) => {
  const awardDate = convertTime(award.awardedAt).split("T")[0];

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`awards/${award.number}`);
        const res = await Api.get(`users/${portfoliOwnerId}/awards`);
        setAwards(res.data);
      }
    } catch (err) {
      alert("오류가 발생했습니다", err);
    }
  };

  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          {award.host}
          <br />
          <span className="text-muted">{award.name}</span>
          <br />
          <span className="text-muted">{awardDate}</span>
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
};

export default AwardCard;
