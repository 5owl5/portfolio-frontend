import { UserImage } from "../db";

class UserImageService {
  static async addImage({ owner, path, fileName }) {
    const newImage = {
      owner,
      path,
      fileName,
    };

    const createdNewImage = await UserImage.create({ newImage });
    return createdNewImage;
  }

  static async getImage({ owner }) {
    const image = await UserImage.findByOwner({ owner });
    return image;
  }

  static async updateImage({ owner, updateContent }) {
    let updatedImage = await UserImage.findByOwner({
      owner,
    });

    updatedImage = await UserImage.update({
      owner,
      updateContent,
    });

    return updatedImage;
  }

  static async deleteImage({ owner }) {
    const deletedImage = await UserImage.delete({
      owner,
    });

    return deletedImage;
  }
}

export { UserImageService };
