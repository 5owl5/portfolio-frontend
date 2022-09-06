import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateEditForm({
  currentCertificate,
  setCertificates,
  setIsEditing,
  portfolioOwnerId,
}) {
  const [name, setName] = useState(currentCertificate.name);
  const [description, setDescription] = useState(
    currentCertificate.description
  );
  const [acquisitionDate, setAquisitionDate] = useState(
    new Date(currentCertificate.acquisitionDate)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const owner = currentCertificate.owner;

    await Api.put(`certificate/${currentCertificate._id}`, {
      owner,
      name,
      description,
      acquisitionDate,
    });

    const res = await Api.get(`users/${portfolioOwnerId}/certificate`);
    const UpdateCertificates = res.data;
    setCertificates(UpdateCertificates);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateEditTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="자격증 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="certificateEditDescription" className="mb-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col>
          <DatePicker
            selected={acquisitionDate}
            onChange={(date) => setAquisitionDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="info" type="submit" size="sm">
            확인
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsEditing(false)}
            size="sm"
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateEditForm;
