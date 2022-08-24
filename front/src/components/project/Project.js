import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from './ProjectEditForm';

function Project({portfolioOwnerId, project, setProjects}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          project={project}
          setProjects={setProjects}
        />
      ) : (
        <ProjectCard 
          setIsEditing={setIsEditing}/>
      )}
    </>
  )
}

export default Project;