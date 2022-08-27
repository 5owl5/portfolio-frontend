import { Card, Row, Button, Col } from "react-bootstrap";
import moment from "moment-timezone";

function ProjectCard({ project, setIsEditing, isEditable }) {
  
  const fromDate = moment(project.startpoint).tz("Asia/Seoul").format('YYYY-MM-DD');
  const toDate = moment(project.endpoint).tz("Asia/Seoul").format('YYYY-MM-DD');

  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          {project.projectName}
          <br />
          <span className="text-muted">{project.content}</span>
          <br />
          <span className="text-muted">
            {fromDate} ~ {toDate}
          </span>
        </Card.Text>
      </Col>
      <Col>
        {isEditable && (
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
        )}
      </Col>
    </Row>
  );
}

export default ProjectCard;
