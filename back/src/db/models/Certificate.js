import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create(newCertificate) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByOwner(owner) {
    const Certificate = await CertificateModel.find({
      owner,
    });
    return Certificate;
  }

  static async findById(_id) {
    const Certificate = await CertificateModel.findOne({ _id });
    return Certificate;
  }
  static async findByAll() {
    const Certificate = await CertificateModel.find({});
    return Certificate;
  }
  static async update({ _id, fieldToUpdate, newValue }) {
    const filter = { _id: _id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async deleteById(_id) {
    try {
      await CertificateModel.findOneAndDelete({ _id });
      // return null;
    } catch (error) {
      return error;
    }
  }
}

export { Certificate };
