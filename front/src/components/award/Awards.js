import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

const Awards = ({ portfolioOwnerId, isEditable }) => {
  const [awards, setAwards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    try {
      Api.get(`users/${portfolioOwnerId}/awards`).then((result) =>
        setAwards(result.data)
      );
    } catch (e) {
      console.error(e);
    }
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.number}
            award={award}
            setAwards={setAwards}
            portfolioOwnerId={portfolioOwnerId}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                className="plus-btn"
                variant="primary"
                onClick={() => setIsAdding(true)}
              >
                +
              </Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Awards;
