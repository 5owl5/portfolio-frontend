import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function ProjectCard({ project, setIsEditing }) {
  const navigate = useNavigate();
  console.log(project)
  const fromDate = project.startpoint.split("T")[0];
  const toDate = project.endpoint.split("T")[0];
  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
        <div>{project.projectName}</div>
        <div style={{color: "#6c757d"}}>{project.content}</div>
        <div style={{color: "#6c757d"}}>{fromDate} ~ {toDate}</div>
        </Card.Text>
      </Col>
      <Col>
        <Button
          variant="outline-info"
          size="sm"
          // onClick={() => setIsAdding(true)}
          style={{
            position: 'absolute', right: 0, marginRight: "30px"
          }}
          onClick={() => setIsEditing(true)}
        >
        편집
        </Button>
      </Col>
        {/* {isAdding && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsAdding(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )} */}
    </Row>
  )
}

export default ProjectCard;