import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ portfolioOwnerId, project, setProjects, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {project && isEditing ? (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          project={project}
          setProjects={setProjects}
          portfolioOwnerId={portfolioOwnerId}
        />
      ) : (
        <ProjectCard
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          setProjects={setProjects}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </>
  );
}

export default Project;
