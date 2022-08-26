import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProjectEditForm";

function Project({ portfolioOwnerId, project, setProjects }) {
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
        <ProjectCard project={project} setIsEditing={setIsEditing} />
      )}
    </>
  );
}

export default Project;
