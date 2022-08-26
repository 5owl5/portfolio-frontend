import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

function ProjectAddForm({ portfolioOwnerId, setIsAdding, setProjects }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.post("projects", {
      projectName: title,
      content: description,
      startpoint: fromDate,
      endpoint: toDate,
    });

    const res = await Api.get(`users/${portfolioOwnerId}/projects`);
    const newProjects = res.data;
    setProjects(newProjects);
    setIsAdding(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectAddTitle" className="mb-3">
          <Form.Control
            type="text"
            placeholder="프로젝트 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="projectAddDescription" className="mb-3">
          <Form.Control
            type="text"
            placeholder="상세내역"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Row} controlId="projectAddDate" className="mb-3">
          <Col>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
            />
          </Col>
          <Col>
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
            />
          </Col>
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
    </>
  );
}

export default ProjectAddForm;
