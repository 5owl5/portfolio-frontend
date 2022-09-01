import { Router } from "express";
import { tokenRefreshService } from "../services/tokenService";
import jwt from "jsonwebtoken";

const tokenRouter = Router();
tokenRouter.post("/token", async function (req, res, next) {
  try {
    const refreshToken = req.body.refreshToken;
    const tokenUser = await tokenRefreshService.getIdByRefreshToken(
      refreshToken
    );
    //리프레시토큰이 비어있지 않고 검색시 리프레시토큰이db에 있을때
    if (refreshToken !== "null" && tokenUser) {
      try {
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const decoded = jwt.verify(refreshToken, secretKey);
        //까보기 성공시 accessToken발급해주기
        const accessToken = jwt.sign({ user_id: decoded.user_id }, secretKey, {
          expiresIn: process.env.ACCESS_TOKEN_TIMEOUT,
        });
        const newRefreshToken = jwt.sign(
          { user_id: decoded.user_id },
          secretKey,
          {
            expiresIn: process.env.REFRESH_TOKEN_TIMEOUT,
          }
        );
        await tokenRefreshService.setToken(decoded.user_id, {
          accessToken: accessToken,
          refreshToken: newRefreshToken,
        });
        res
          .status(201)
          .json({ accessToken: accessToken, refreshToken: newRefreshToken });
      } catch (err) {
        //토큰 유효하지 않을때 저장된 토큰 지우기
        await tokenRefreshService.deleteByRefreshToken(refreshToken);
        res
          .status(490)
          .send({ data: "올바르지 않은 토큰입니다", err: err, logout: true });
      }
    } else {
      await tokenRefreshService.deleteByRefreshToken(refreshToken);

      res.status(490).send({ logout: true });
    }
  } catch (error) {
    next(error);
  }
});
export { tokenRouter };
