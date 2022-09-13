import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get(`users/${portfolioOwnerId}/certificate`).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate._id}
            certificate={certificate}
            setCertificates={setCertificates}
            portfolioOwnerId={portfolioOwnerId}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button className="plus-btn" onClick={() => setIsAdding(true)}>
                +
              </Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
