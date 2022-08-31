import { awardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await awardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ userId }) {
    const userAwards = await awardModel.find({ userId });
    return userAwards;
  }

  static async findByIdAndNumber({ userId, awardNumber }) {
    const userAwards = await awardModel.findOne({ userId, number: awardNumber });
    return userAwards;
  }

  static async update({ userId, awardNumber, updateContent, newValue }) {
    const filter = { userId, number: awardNumber };
    const content = { [updateContent]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await awardModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updatedAward;
  }

  static async delete({userId, awardNumber}){
    const deleteAward = await awardModel.findOneAndDelete({userId, number: awardNumber})
    return deleteAward
  }
}

export { Award };
