import { Award } from "../db";

class awardService {
  static async addAward({ userId, awardHost, awardName, awardedAt }) {
    const newAward = {
      userId,
      host: awardHost,
      name: awardName,
      awardedAt,
    };

    const createdNewAward = await Award.create({ newAward });
    return createdNewAward;
  }

  static async getAwards({ userId }) {
    const awards = await Award.findById({ userId });
    return awards;
  }

  static async updateAward({ userId, awardNumber, updateContent }) {
    let updatedAward = await Award.findByIdAndNumber({
      userId,
      awardNumber,
    });

    if (updateContent.awardHost) {
      const field = "host";
      const newValue = updateContent.awardHost;
      updatedAward = await Award.update({
        userId,
        awardNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.awardName) {
      const field = "name";
      const newValue = updateContent.awardName;
      updatedAward = await Award.update({
        userId,
        awardNumber,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.awardedAt) {
      const field = "awardedAt";
      const newValue = updateContent.awardedAt;
      updatedAward = await Award.update({
        userId,
        awardNumber,
        updateContent: field,
        newValue,
      });
    }

    return updatedAward;
  }

  static async deleteAward({ userId, awardNumber }) {
    const deleteAward = await Award.delete({
      userId,
      awardNumber,
    });

    return deleteAward;
  }
}

export { awardService };
