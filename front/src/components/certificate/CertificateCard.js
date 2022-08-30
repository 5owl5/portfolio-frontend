import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import convertTime from "../../utils/convertTime";

function CertificateCard({
  certificate,
  currentCertificate,
  isEditable,
  setIsEditing,
  setCertificates,
  portfolioOwnerId,
}) {
  const certificateDate = convertTime(certificate.acquisitionDate).split(
    "T"
  )[0];

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`cer/${currentCertificate._id}`);
        const res = await Api.get(`users/${portfolioOwnerId}/cer`);
        setCertificates(res.data);
      }
    } catch (err) {
      alert("오류가 발생했습니다.", err);
    }
  };

  return (
    <Row className="mb-4">
      <Col>
        <Card.Text>
          {certificate.name}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificateDate}</span>
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

export default CertificateCard;
