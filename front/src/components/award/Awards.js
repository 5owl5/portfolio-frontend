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
    <Card>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.awardNumber}
            award={award}
            setAwards={setAwards}
            portfolioOwnerId={portfolioOwnerId}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" onClick={() => setIsAdding(true)}>
                  +
                </Button>
              </Col>
            </Row>
          </Col>
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
