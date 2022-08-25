import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
    const [title, setTitle] = useState(currentCertificate.title);
    const [description, setDescription] = useState(currentCertificate.description);
    const [whenDate, setWhenDate] = useState(new Date(currentCertificate.when_date));

    return (
        <>
        <Form>
            <Form.Group controlId="certificateEditTitle">
                <Form.Control
                    type="text"
                    placeholder="자격증 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
        </Form>
        
        <Form>
            <Form.Group controlId="certificateEditDescription" className="mt-3">
                 <Form.Control
                    type="text"
                    placeholder="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>
        </Form>

        <Form>
            <Form.Group as={Row} className="mt-3">
                 <Col xs="auto">
                    <DatePicker
                        selected={whenDate}
                        onChange={(date) => setWhenDate(date)}
                />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center mb-4">
                <Col sm={{ span: 20}}>
                    <Button variant="primary" type="submit" className="me-3">
                        확인
                    </Button>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
        </>
    );
}

export default CertificateEditForm;