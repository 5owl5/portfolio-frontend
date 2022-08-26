import { projectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await projectModel.create(newProject);
    return createdNewProject;
  }

  static async findById({ userId }) {
    const userProjects = await projectModel.find({ userId });
    return userProjects;
  }

  static async findByIdAndNumber({ userId, projectNumber }) {
    const userProjects = await projectModel.findOne({ userId, projectNumber });
    return userProjects;
  }

  static async update({ userId, projectNumber, updateContent, newValue }) {
    const filter = { userId, projectNumber };
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
