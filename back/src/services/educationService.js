import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
class EducationService {
  static async addEdcation({ owner, name, major, present }) {
    const id = uuidv4();
    const newEdu = { id, owner, name, major, present };

    const createdNewEdu = await Education.create(newEdu);
    createdNewEdu.errorMessage = null;

    return createdNewEdu;
  }

  static async getOwnerEducation({ owner }) {
    const education = await Education.findByOwner(owner);
    return education;
  }
}

export { EducationService };
