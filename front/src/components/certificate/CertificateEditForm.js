import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing, portfolioOwnerId }) {
    const [name, setName] = useState(currentCertificate.name);
    const [description, setDescription] = useState(currentCertificate.description);
    const [whenDate, setWhenDate] = useState(new Date(currentCertificate.acquisitionDate));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const owner = portfolioOwnerId;
        const acquisitionDate = whenDate.toISOString().split("T")[0];

        await Api.put(`cer/${currentCertificate._id}`, {
            owner,
            name,
            description,
            acquisitionDate,
        });

        const res = await Api.get(`users/${portfolioOwnerId}/cer`);
        setCertificates(res.data);
        setIsEditing(false);
    };

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certificateEditTitle">
                <Form.Control
                    type="text"
                    placeholder="자격증 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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