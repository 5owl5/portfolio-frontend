import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class CertificateService {
  static async addCertificate({ owner, name, description, acquisitionDate }) {
    const newCer = { owner, name, description, acquisitionDate };

    const createdNewCer = await Certificate.create(newCer);
    createdNewCer.errorMessage = null;

    return createdNewCer;
  }

  static async getOwnerCertificate({ owner }) {
    const certificate = await Certificate.findByOwner(owner);
    return certificate;
  }
  static async getIdCertificate({ _id }) {
    const certificate = await Certificate.findById(_id);
    return certificate;
  }

  static async setCertificate({ _id, toUpdate }) {
    let certificate = await Certificate.findById(_id);
    if (!certificate) {
      const errorMessage = "해당 학적사항이 없습니다";

      return { errorMessage };
    }
    if (certificate.owner != toUpdate.owner) {
      const errorMessage = "본인의 학적사항이 아닙니다";

      return { errorMessage };
    }
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }
    if (toUpdate.acquisitionDate) {
      const fieldToUpdate = "acquisitionDate";
      const newValue = toUpdate.acquisitionDate;
      certificate = await Certificate.update({ _id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async deleteCertificate({ _id }) {
    const deleteCertificate = await Certificate.delete( {_id} );
    return deleteCertificate;
  }
}

export { CertificateService };
