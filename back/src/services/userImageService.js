import { UserImage } from "../db";

class userImageService {
  static async addImage({ userId, path, fileName }) {
    const newImage = {
      userId,
      path,
      fileName,
    };

    const createdNewImage = await UserImage.create({ newImage });
    return createdNewImage;
  }

  static async getImage({ userId }) {
    const image = await UserImage.findById({ userId });
    return image;
  }

  static async updateImage({ userId, updateContent }) {
    let updatedImage = await UserImage.findById({
      userId,
    });

    updatedImage = await UserImage.update({
      userId,
      updateContent,
    });

    return updatedImage;
  }

  static async deleteImage({ userId }) {
    const deleteImage = await UserImage.delete({
      userId,
    });

    return deleteImage;
  }
}

export { userImageService };
