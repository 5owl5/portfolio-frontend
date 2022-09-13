import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByOwner({ owner }) {
    const userAwards = await AwardModel.find({ owner });
    return userAwards;
  }

  static async findByOwnerAndNumber({ Owner, number }) {
    const userAward = await AwardModel.findOne({
      Owner,
      number,
    });
    return userAward;
  }

  static async update({ Owner, number, updateContent, newValue }) {
    const filter = { Owner, number };
    const content = { [updateContent]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updatedAward;
  }

  static async delete({ Owner, number }) {
    const deletedAward = await AwardModel.findOneAndDelete({
      Owner,
      number,
    });
    return deletedAward;
  }
}

export { Award };
