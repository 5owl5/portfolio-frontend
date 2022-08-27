import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CertificateCard({
  certificate,
  currentCertificate,
  isEditable,
  setIsEditing,
  setCertificates,
  portfolioOwnerId,
}) {
  function convertTime(date) {
    date = new Date(date);
    let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    let dateOffset = new Date(date.getTime() - offset);
    return dateOffset.toISOString();
  }
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
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          {certificate.name}
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificateDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-3"
            >
              편집
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              className="mr-3"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard;
