import { Card, Row, Button, Col } from "react-bootstrap";

function ProjectCard({ project, setIsEditing }) {
  const fromDate = project.startpoint.split("T")[0];
  const toDate = project.endpoint.split("T")[0];

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
      </Col>
    </Row>
  );
}

export default ProjectCard;
