import { Project } from "../db";

class projectService {
  static async addProject({
    userSchema,
    projectNumber,
    projectName,
    content,
    startpoint,
    endpoint,
  }) {
    const newProject = {
      user: userSchema,
      projectNumber,
      projectName,
      content,
      startpoint,
      endpoint,
    };

    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;
    return createdNewProject;
  }

  static async getProject({ userSchema }) {
    const projects = await Project.findByUser({ user: userSchema });

    return projects;
  }

  static async updateProject({ userSchema, projectNumber, updateContent }) {
    let updatedproject = await Project.findByUserAndNumber({
      user: userSchema,
      projectNumber,
    });

    if (updateContent.projectName) {
      const field = "projectName";
      const newValue = updateContent.projectName;
      updatedproject = await Project.update({
        user: userSchema,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.content) {
      const field = "content";
      const newValue = updateContent.content;
      updatedproject = await Project.update({
        user: userSchema,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.startpoint) {
      const field = "startpoint";
      const newValue = updateContent.startpoint;
      updatedproject = await Project.update({
        user: userSchema,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.endpoint) {
      const field = "endpoint";
      const newValue = updateContent.endpoint;
      updatedproject = await Project.update({
        user: userSchema,
        projectNumber,
        updateContent: field,
        newValue,
      });
    }

    return updatedproject;
  }
}

export { projectService };
