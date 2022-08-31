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
    const userProjects = await projectModel.findOne({ userId, number: projectNumber });
    return userProjects;
  }

  static async update({ userId, projectNumber, updateContent, newValue }) {
    const filter = { userId, number: projectNumber };
    const content = { [updateContent]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await projectModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updatedProject;
  }

  static async delete({userId, projectNumber}){
    const deleteProject = await projectModel.findOneAndDelete({userId, number: projectNumber})
    return deleteProject
  }
}

export { Project };
