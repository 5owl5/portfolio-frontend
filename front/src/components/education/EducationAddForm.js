import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding }) {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [present, setPresent] = useState("재학중");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const owner = portfolioOwnerId;

    await Api.post("edu", {
      owner,
      name,
      major,
      present,
    });
    const res = await Api.get(`users/${portfolioOwnerId}/edu`);
    setEducations(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="educationAddTitle">
        <Form.Control
          type="text"
          placeholder="학교이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="educationAddMajor" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
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

export default EducationAddForm;
