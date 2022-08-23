import { EducationModel } from "../schemas/Education";

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

  static async findById({ _id }) {
    const Education = await EducationModel.find({ id: _id });
    return Education;
  }
  static async findById({ _id }) {
    const Education = await EducationModel.find({ id: _id });
    return Education;
  }
  static async findByAll() {
    const Education = await EducationModel.find({});
    return Education;
  }
  static async update({ EducationId, fieldToUpdate, newValue }) {
    const filter = { _id: EducationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }
}

export { Education };
