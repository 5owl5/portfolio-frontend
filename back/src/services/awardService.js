import { Award } from "../db";

class AwardService {
  static async addAward({ owner, host, prize, awardedAt }) {
    const newAward = {
      owner,
      host,
      prize,
      awardedAt,
    };

    const createdNewAward = await Award.create({ newAward });
    return createdNewAward;
  }

  static async getAwards({ owner }) {
    const awards = await Award.findByOwner({ owner });
    return awards;
  }

  static async updateAward({ owner, number, updateContent }) {
    let updatedAward = await Award.findByOwnerAndNumber({
      owner,
      number,
    });

    if (updateContent.host) {
      const field = "host";
      const newValue = updateContent.host;
      updatedAward = await Award.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.prize) {
      const field = "prize";
      const newValue = updateContent.prize;
      updatedAward = await Award.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    if (updateContent.awardedAt) {
      const field = "awardedAt";
      const newValue = updateContent.awardedAt;
      updatedAward = await Award.update({
        owner,
        number,
        updateContent: field,
        newValue,
      });
    }

    return updatedAward;
  }

  static async deleteAward({ owner, number }) {
    const deletedAward = await Award.delete({
      owner,
      number,
    });

    return deletedAward;
  }
}

export { AwardService };
