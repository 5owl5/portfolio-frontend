import { Card, Row, Button, Col } from "react-bootstrap";

function ProjectCard({ project, setIsEditing, isEditable }) {
  function convertTime(date) {
    date = new Date(date);
    let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    let dateOffset = new Date(date.getTime() - offset);
    return dateOffset.toISOString();
  }

  // const fromDate = project.startpoint.split("T")[0];
  // const toDate = project.endpoint.split("T")[0];
  const fromDate = convertTime(project.startpoint).split("T")[0];
  const toDate = convertTime(project.endpoint).split("T")[0];
  console.log(convertTime(project.startpoint));
  //console.log(convertTime(new Date()));
  //console.log(project.startpoint);
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
