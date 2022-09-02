import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findByOwner({ owner }) {
    const userProjects = await ProjectModel.find({ owner });
    return userProjects;
  }

  static async findByOwnerAndNumber({ owner, number }) {
    const userProject = await ProjectModel.findOne({ owner, number });
    return userProject;
  }

  static async update({ owner, number, updateContent, newValue }) {
    const filter = { owner, number };
    const content = { [updateContent]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updatedProject;
  }

  static async delete({ owner, number }) {
    const deletedProject = await ProjectModel.findOneAndDelete({
      owner,
      number,
    });
    return deletedProject;
  }
}

export { Project };
