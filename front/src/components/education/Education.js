import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ education, setEducations, portfolioOwnerId }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        education && (
          <EducationCard education={education} setIsEditing={setIsEditing} />
        )
      )}
    </>
  );
}

export default Education;
