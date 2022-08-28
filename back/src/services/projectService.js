import { Project } from "../db";

class projectService {
  static async addProject({
    userId,
    projectNumber,
    projectName,
    content,
    startpoint,
    endpoint,
  }) {
    const newProject = {
      userId,
      number: projectNumber,
      name: projectName,
      content,
      startpoint,
      endpoint,
    };

    const createdNewProject = await Project.create({ newProject });
    return createdNewProject;
  }

  static async getProjects({ userId }) {
    const projects = await Project.findById({ userId });
    return projects;
  }

  static async updateProject({ userId, projectNumber, updateContent }) {
    let updatedproject = await Project.findByIdAndNumber({
      userId,
      projectNumber,
    });

    if (updateContent.projectName) {
      const field = "name";
      const newValue = updateContent.projectName;
      updatedproject = await Project.update({
        userId,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.content) {
      const field = "content";
      const newValue = updateContent.content;
      updatedproject = await Project.update({
        userId,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.startpoint) {
      const field = "startpoint";
      const newValue = updateContent.startpoint;
      updatedproject = await Project.update({
        userId,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.endpoint) {
      const field = "endpoint";
      const newValue = updateContent.endpoint;
      updatedproject = await Project.update({
        userId,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    return updatedproject;
  }

  static async deleteProject({
    userId,
    projectNumber
  }) {
    const deleteProject = await Project.delete({
      userId,
      projectNumber
    })
    return deleteProject
  }
}

export { projectService };
