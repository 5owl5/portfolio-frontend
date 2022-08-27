import { Card, Button, Row, Col } from "react-bootstrap";
import moment from "moment-timezone";

const AwardCard = ({ award, setIsEditing, isEditable }) => {
  let agreementTime = moment(award.awardDate).tz("Asia/Seoul").format('YYYY-MM-DD');
  const awardDate = agreementTime;

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

      
      {isEditable&&(<Col>
        <Button
          variant="outline-info"
          size="sm"
          style={{
            position: "absolute",
            right: 0,
            marginRight: "30px",
          }}
          onClick={() => setIsEditing(true)}
        >
          편집
        </Button>
      </Col>)}
    </Row>
  );
};


export default AwardCard;
