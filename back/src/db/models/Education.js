import { EducationModel } from "../schemas/education";

class Education {
  static async create(newEducation) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByOwner(owner) {
    const Education = await EducationModel.find({
      owner,
    });
    return Education;
  }

  static async findById(_id) {
    const Education = await EducationModel.findOne({ _id });
    return Education;
  }
  static async findByAll() {
    const Education = await EducationModel.find({});
    return Education;
  }
  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id: _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
  static async deleteById(_id) {
    try {
      await EducationModel.findOneAndDelete({ _id });
      // return null;
    } catch (error) {
      return error;
    }
  }
}

export { Education };
