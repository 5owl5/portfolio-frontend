import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function EducationEditForm({
  currentEducation,
  setEducations,
  setIsEditing,
  portfolioOwnerId,
}) {
  const [name, setName] = useState(currentEducation.name);

  const [description, setDescription] = useState(currentEducation.description);
  const [whenDate, setWhenDate] = useState(
    new Date(currentEducation.acquisitionDate)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const owner = currentEducation.owner;
    const acquisitionDate = whenDate.toISOString().split("T")[0];

    await Api.put(`edu/${currentEducation.id}`, {
      owner,
      name,
      description,
      acquisitionDate,
    });

    const res = await Api.get(`users/${portfolioOwnerId}/edu`);
    setEducations(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationAddTitle">
        <Form.Control
          type="text"
          placeholder="학력내역"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="educationAddDescription" className="mt-3">
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
            selected={whenDate}
            onChange={(date) => setWhenDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
