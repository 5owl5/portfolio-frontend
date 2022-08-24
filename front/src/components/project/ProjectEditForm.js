import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from 'react-datepicker';


function ProjectEditForm({ setIsEditing, project, setProjects }) {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [fromDate, setFromDate] = useState(project.fromDate);
  const [toDate, setToDate] = useState(project.toDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="projectEditTitle" className="mb-3">
            <Form.Control
              type="text"
              placeholder="프로젝트 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="projectEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="상세 내역"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId="projectEditDate" className="mb-3">
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
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProjectEditForm;
