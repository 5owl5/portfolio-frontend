import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

function Education({ portfolioOwnerId, education, setEducations, isEditable }) {
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
          <EducationCard
            currentEducation={education}
            setEducations={setEducations}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
            portfolioOwnerId={portfolioOwnerId}
          />
        )
      )}
    </>
  );
}

export default Education;
