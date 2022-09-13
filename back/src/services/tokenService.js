import { Token } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class tokenRefreshService {
  static async addToken({ id, accessToken, refreshToken }) {
    const newToken = { id, accessToken, refreshToken };
    const setNewToken = await Token.create(newToken);
  }

  static async getIdByAccessToken(accessToken) {
    const token = await Token.findByAccessToken(accessToken);
    return token;
  }
  static async getIdByRefreshToken(refreshToken) {
    const token = await Token.findByrefreshToken(refreshToken);

    return token;
  }

  static async setToken(id, toUpdate) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await Token.findById(id);
    if (!user) {
      const errorMessage = "인증 내역이 없습니다";
      return { errorMessage };
    }

    if (toUpdate.accessToken) {
      const fieldToUpdate = "accessToken";
      const newValue = toUpdate.accessToken;
      user = await Token.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.refreshToken) {
      const fieldToUpdate = "refreshToken";
      const newValue = toUpdate.refreshToken;
      user = await Token.update({ id, fieldToUpdate, newValue });
    }

    return user;
  }
  static async deleteByRefreshToken(refreshToken) {
    const token = await Token.deleteByRefreshToken(refreshToken);
    return token;
  }
  static async deleteById(id) {
    const token = await Token.deleteById(id);
    return token;
  }
}
export { tokenRefreshService };
