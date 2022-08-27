import { Card, Button, Row, Col } from "react-bootstrap";

function EducationCard({ education, isEditable, setIsEditing }) {
  const awardDate = award.awardDate.split("T")[0];

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.educationTitle}</span>
          <br />
          <span className="text-muted">{education.educationName}</span>
          <br />
          <span className="text-muted">{awardDate}</span>
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
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
