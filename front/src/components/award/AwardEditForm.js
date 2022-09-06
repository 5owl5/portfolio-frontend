import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

const AwardEditForm = ({
  award,
  setAwards,
  setIsEditing,
  portfolioOwnerId,
}) => {
  const [title, setTitle] = useState(award.host);
  const [description, setDescription] = useState(award.prize);
  const [awardDate, setAwardDate] = useState(new Date(award.awardedAt));
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`award/${award.number}`, {
        host: title,
        prize: description,
        awardedAt: awardDate,
      });

      const res = await Api.get(`users/${portfolioOwnerId}/awards`);
      const edit = res.data;
      setAwards(edit);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mb-3">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mb-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} controlId="awardEditDate" className="mb-3">
        <Col>
          <DatePicker
            selected={awardDate}
            onChange={(date) => setAwardDate(date)}
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
};

export default AwardEditForm;
