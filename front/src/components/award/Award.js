import React from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";
import { useState } from "react";
const Award = ({ portfolioOwnerId, award, setAwards, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <AwardEditForm
          award={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        <AwardCard
          award={award}
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
          isEditable={isEditable}
          setAwards={setAwards}
        />
      )}
    </div>
  );
};

export default Award;
