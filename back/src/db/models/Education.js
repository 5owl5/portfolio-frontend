import { EducationModel } from "../schemas/Education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }
  static async findByOwner({ user_id }) {
    const Education = await EducationModel.find({ owner: user_id });
    return Education;
  }
  static async update({ EducationId, fieldToUpdate, newValue }) {
    const filter = { id: EducationId };
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
