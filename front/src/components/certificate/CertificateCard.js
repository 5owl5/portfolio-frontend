import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

import convertTime from "../../utils/convertTime";

function CertificateCard({
  currentCertificate,
  isEditable,
  setIsEditing,
  setCertificates,
  portfolioOwnerId,
}) {
  const certificateDate = convertTime(currentCertificate.acquisitionDate).split(
    "T"
  )[0];

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (window.confirm("삭제하시겠습니까?")) {
        await Api.delete(`cer/${currentCertificate._id}`);
        const res = await Api.get(`users/${portfolioOwnerId}/cer`);
        console.log(res.data);
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
          {currentCertificate.name}
          <br />
          <span className="text-muted">{currentCertificate.description}</span>
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
