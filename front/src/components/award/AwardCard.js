import { Card, Button, Row, Col } from "react-bootstrap";
import convertTime from "../../utils/convertTime";
import * as Api from "../../api";
import React from "react";

const AwardCard = ({
  portfolioOwnerId,
  award,
  setIsEditing,
  isEditable,
  setAwards,
}) => {
  const awardDate = convertTime(award.awardDate).split("T")[0];

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`awards/${award.awardnumber}`);
        const res = await Api.get(`users/${portfolioOwnerId}/awards`);
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
          {award.awardWhere}
          <br />
          <span className="text-muted">{award.awardName}</span>
          <br />
          <span className="text-muted">{awardDate}</span>
        </Card.Text>
      </Col>

      {isEditable && (
        <Col xs lg="1">
          <Button
            variant="outline-info"
            size="sm"
            className="mr-3"
            onClick={() => setIsEditing(true)}
          >
            편집
          </Button>
          <br />
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
  );
};

export default AwardCard;
