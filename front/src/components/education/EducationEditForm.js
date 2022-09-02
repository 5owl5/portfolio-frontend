import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({
  currentEducation,
  setEducations,
  setIsEditing,
  portfolioOwnerId,
}) {
  const [name, setName] = useState(currentEducation.name);
  const [major, setMajor] = useState(currentEducation.major);
  const [present, setPresent] = useState(currentEducation.present);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const owner = currentEducation.owner;

    await Api.put(`edu/${currentEducation._id}`, {
      owner,
      name,
      major,
      present,
    });

    const res = await Api.get(`users/${owner}/edu`);
    setEducations(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationEditTitle">
        <Form.Control
          type="text"
          placeholder="학력내역"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="educationEditMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학중"
          id="radio-add-1"
          type="radio"
          name="present"
          value="재학중"
          checked={present === "재학중"}
          onChange={(e) => setPresent(e.target.value)}
        />
        <Form.Check
          inline
          label="학사졸업"
          id="radio-add-2"
          type="radio"
          name="present"
          value="학사졸업"
          checked={present === "학사졸업"}
          onChange={(e) => setPresent(e.target.value)}
        />

        <Form.Check
          inline
          label="석사졸업"
          id="radio-add-3"
          type="radio"
          name="present"
          value="석사졸업"
          checked={present === "석사졸업"}
          onChange={(e) => setPresent(e.target.value)}
        />

        <Form.Check
          inline
          label="박사졸업"
          id="radio-add-4"
          type="radio"
          name="present"
          value="박사졸업"
          checked={present === "박사졸업"}
          onChange={(e) => setPresent(e.target.value)}
        />
      </div>

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

export default EducationEditForm;
