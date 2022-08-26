import { Award } from "../db";

class awardService {
  static async addAward({
    userId,
    awardNumber,
    awardWhere,
    awardName,
    awardDate,
  }) {
    const newAward = {
      userId,
      awardNumber,
      awardWhere,
      awardName,
      awardDate,
    };

    const createdNewAward = await Award.create({ newAward });
    return createdNewAward;
  }

  static async getAward({ userId }) {
    const awards = await Award.findById({ userId });
    return awards;
  }

  static async updateAward({ userId, awardNumber, updateContent }) {
    let updatedAward = await Award.findByIdAndNumber({
      userId,
      awardNumber,
    });

    if (updateContent.awardWhere) {
      const field = "awardWhere";
      const newValue = updateContent.awardWhere;
      updatedAward = await Award.update({
        userId,
        awardNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.awardName) {
      const field = "awardName";
      const newValue = updateContent.awardName;
      updatedAward = await Award.update({
        userId,
        awardNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.awardDate) {
      const field = "awardDate";
      const newValue = updateContent.awardDate;
      updatedAward = await Award.update({
        userId,
        awardNumber,
        updateContent: field,
        newValue,
      });
    }

    return updatedAward;
  }
}

export { awardService };
