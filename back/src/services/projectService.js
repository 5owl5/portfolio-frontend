import { Project } from "../db";

class ProjectService {
  static async addProject({ owner, name, content, startDate, endDate }) {
    const newProject = {
      owner,
      name,
      content,
      startDate,
      endDate,
    };

    const createdNewProject = await Project.create({ newProject });
    return createdNewProject;
  }

  static async getProjects({ owner }) {
    const projects = await Project.findByOwner({ owner });
    return projects;
  }

  static async updateProject({ owner, number, updateContent }) {
    let updatedproject = await Project.findByOwnerAndNumber({
      owner,
      number,
    });

    if (updateContent.name) {
      const field = "name";
      const newValue = updateContent.name;
      updatedproject = await Project.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.content) {
      const field = "content";
      const newValue = updateContent.content;
      updatedproject = await Project.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.startDate) {
      const field = "startDate";
      const newValue = updateContent.startDate;
      updatedproject = await Project.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.endDate) {
      const field = "endDate";
      const newValue = updateContent.endDate;
      updatedproject = await Project.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    return updatedproject;
  }

  static async deleteProject({ owner, number }) {
    const deletedProject = await Project.delete({
      owner,
      number,
    });
    return deletedProject;
  }
}

export { ProjectService };
