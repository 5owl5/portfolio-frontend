import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import convertTime from "../../utils/convertTime";

function ProjectCard({
  project,
  setIsEditing,
  isEditable,
  setProjects,
  portfolioOwnerId,
}) {
  const fromDate = convertTime(project.startpoint).split("T")[0];
  const toDate = convertTime(project.endpoint).split("T")[0];

  const handleDelete = async (e) => {
    e.preventDefalut();

    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`project/${project.projectNumber}`);
        const res = await Api.get(`users/${portfolioOwnerId}/projects`);
        setProjects(res.data);
      }
    } catch (err) {
      alert("오류가 발생했습니다.", err);
    }
  };
  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          {project.name}
          <br />
          <span className="text-muted">{project.content}</span>
          <br />
          <span className="text-muted">
            {fromDate} ~ {toDate}
          </span>
        </Card.Text>
      </Col>
      {isEditable && (
        <>
          <Col xs="auto">
            <Button variant="info" onClick={() => setIsEditing(true)} size="sm">
              편집
            </Button>
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={handleDelete} size="sm">
              삭제
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
}

export default ProjectCard;
