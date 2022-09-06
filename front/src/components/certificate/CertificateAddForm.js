import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateAddForm({
  portfolioOwnerId,
  setCertificates,
  setIsAdding,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const owner = portfolioOwnerId;

    await Api.post("certificate", {
      owner,
      name,
      description,
      acquisitionDate,
    });

    const res = await Api.get(`users/${portfolioOwnerId}/certificate`);
    setCertificates(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          placeholder="자격증 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="certificateAddDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={acquisitionDate}
            onChange={(date) => setAcquisitionDate(date)}
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
            size="sm"
            onClick={() => setIsAdding(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
