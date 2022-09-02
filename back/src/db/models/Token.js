import { TokenModel } from "../schemas/token";

class Token {
  static async create(newToken) {
    const createdNewToken = await TokenModel.create(newToken);
    return createdNewToken;
  }

  static async findById(id) {
    const Token = await TokenModel.findOne({ id });
    return Token;
  }
  static async findByAccessToken(accessToken) {
    const Token = await TokenModel.findOne({ accessToken });
    return Token;
  }
  static async findByrefreshToken(refreshToken) {
    const Token = await TokenModel.findOne({ refreshToken });
    return Token;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedToken = await TokenModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedToken;
  }

  static async deleteById(id) {
    try {
      await TokenModel.findOneAndDelete({ id });
      return null;
    } catch (error) {
      return error;
    }
  }
  static async deleteByRefreshToken(refreshToken) {
    try {
      await TokenModel.findOneAndDelete({ refreshToken });
      return null;
    } catch (error) {
      return error;
    }
  }
}

export { Token };
