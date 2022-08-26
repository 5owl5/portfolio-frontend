import React from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";

const Award = (award, setAwards, isEditable) => {
  let [isEditing, setisEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <AwardEditForm
          currentAward={award}
          setAwards={setAwards}
          setisEditing={setisEditing}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setisEditing={setisEditing}
        />
      )}
    </div>
  );
};

export default Award;
