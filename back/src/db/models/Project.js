import { projectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await projectModel.create(newProject);
    return createdNewProject;
  }

  static async findByUser({ user }) {
    const userProjects = await projectModel.find({ user });
    return userProjects;
  }

  static async findByUserAndNumber({ user, projectNumber }) {
    const userProjects = await projectModel.findOne({ user, projectNumber });
    return userProjects;
  }

  static async update({ user, projectNumber, updateContent, newValue }) {
    const filter = { user, projectNumber };
    const content = { [updateContent]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updatedProject;
  }
}

export { Project };
