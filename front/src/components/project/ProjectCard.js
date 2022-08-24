import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function ProjectCard({ project, setIsEditing }) {
  const navigate = useNavigate();
  return (
    <Row>
      <Col>
        <Card.Text>
        <div>프로젝트 이름</div>
        <div>프로젝트 설명</div>
        <div>프로젝트 기간</div>
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