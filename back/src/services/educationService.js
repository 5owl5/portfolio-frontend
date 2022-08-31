import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
class EducationService {
  static async addEducation({ owner, name, major, present }) {
    const newEdu = { owner, name, major, present };

    const createdNewEdu = await Education.create(newEdu);
    createdNewEdu.errorMessage = null;

    return createdNewEdu;
  }

  static async getOwnerEducation({ owner }) {
    const education = await Education.findByOwner(owner);
    return education;
  }

  static async getIdEducation({ _id }) {
    const education = await Education.findById(_id);
    return education;
  }

  static async setEducation({ _id, toUpdate }) {
    let education = await Education.findById({ _id });
    if (!education) {
      const errorMessage = "해당 학적사항이 없습니다";

      return { errorMessage };
    }
    if (education.owner != toUpdate.owner) {
      const errorMessage = "본인의 학적사항이 아닙니다";

      return { errorMessage };
    }
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.present) {
      const fieldToUpdate = "present";
      const newValue = toUpdate.present;
      education = await Education.update({ _id, fieldToUpdate, newValue });
    }

    return education;
  }

  static async deleteIdEdu({ _id, owner }) {
    let education = await Education.findById(_id);
    if (!education) {
      return "해당되는 학적이 없습니다.";
    }
    if (education.owner != owner) {
      return "본인의 학적이 아닙니다.";
    }
    education = await Education.deleteById(_id);
    return education;
  }
}

export { EducationService };
