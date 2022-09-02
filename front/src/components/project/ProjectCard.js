import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import convertTime from "../../utils/convertTime";
import swal from "sweetalert";
function ProjectCard({
  project,
  setIsEditing,
  isEditable,
  setProjects,
  portfolioOwnerId,
}) {
  const fromDate = convertTime(project.startDate).split("T")[0];
  const toDate = convertTime(project.endDate).split("T")[0];

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      swal({
        title: "삭제하시겠습니까?",
        text: "한번 삭제된 데이터는 복구할 수 없습니다",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await Api.delete(`project/${project.number}`);
          const res = await Api.get(`users/${portfolioOwnerId}/projects`);
          setProjects(res.data);
          swal("삭제 완료", "화끈하시네요", "success");
        } else {
          swal("삭제취소", "당신의 수상내역은 안전합니다", "info");
        }
      });
    } catch (err) {
      alert("오류가 발생했습니다", err);
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
