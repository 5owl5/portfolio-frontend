import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  let [date, setDate] = useState(new Date());
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post("educations", {
      educationTitle: title,
      educationName: description,
      educationDate: date,
    });
    const res = await Api.get(`users/${portfolioOwnerId}/educations`);
    setEducations(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationAddTitle">
        <Form.Control
          type="text"
          placeholder="학력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddForm;
