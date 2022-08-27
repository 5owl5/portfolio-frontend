import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({ portfolioOwnerId, certificate, setCertificates, isEditable }) {

  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          setCertificates={setCertificates}
        />
      )}
    </>
  );
}

export default Certificate;
