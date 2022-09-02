import { ImageModel } from "../schemas/userImage";

class UserImage {
  static async create({ newImage }) {
    const createdNewImage = await ImageModel.create(newImage);
    return createdNewImage;
  }

  static async findByOwner({ owner }) {
    const findUserImage = await ImageModel.findOne({ owner });
    return findUserImage;
  }

  static async update({ owner, updateContent }) {
    const filter = { owner };
    const content = { $set: updateContent };
    const option = { returnOriginal: false };

    const updatedUserImage = await ImageModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updatedUserImage;
  }

  static async delete({ owner }) {
    return await ImageModel.findOneAndDelete({ owner });
  }
}

export { UserImage };
