import { ImageModel } from "../schemas/userImage";

class UserImage {
  static async create({ newImage }) {
    const createNewImage = await ImageModel.create(newImage);
    return createNewImage;
  }

  static async findById({ userId }) {
    const findUserImage = await ImageModel.findOne({ userId });
    return findUserImage;
  }

  static async update({ user_id, updateContent }) {
    const filter = { user_id };
    const content = { $set: updateContent };
    const option = { returnOriginal: false };

    const updateUserImage = await ImageModel.findOneAndUpdate(
      filter,
      content,
      option
    );
    return updateUserImage;
  }

  static async delete({ user_id }) {
    return await ImageModel.findOneAndDelete({ user_id });
  }
}

export { UserImage };
