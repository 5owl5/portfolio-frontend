import jwt from "jsonwebtoken";
import { tokenRefreshService } from "../services/tokenService";

function token_refresh(req, res, next) {
  let oldSend = res.send;
  console.log("hi! token_refresh");
  res.send = async function (data) {
    res.send = oldSend;
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    const tokenUser = await tokenRefreshService.getIdByAccessToken(userToken);
    console.log("여기?");
    if (userToken != "null" && tokenUser) {
      try {
        console.log("여기2?");
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const decoded = jwt.verify(userToken, secretKey);
        console.log("여기?3");
      } catch (err) {
        console.log("여기?4");
        let errorMessage = "토큰이 만료되었습니다.";
        let token_data = {
          errorMessage,
        };
        let margeData = { data, token_data };
        return res.send(margeData);
      }
    } else if (userToken != "null" && tokenUser == null) {
      console.log("여기?5");
      console.log(userToken);
      let errorMessage = "토큰이 저장되어있지 않습니다";
      let token_data = {
        errorMessage,
      };
      console.log("여기?8");
      let margeData = { data, token_data };
      return res.send(margeData);
    }
    console.log("진짜?");
    try {
      return res.send(data);
      console.log("여기?7");
    } catch (error) {
      console.log("여기?6");
      console.log(error);
    }

    // do something with the data
  };
  next();
}
export { token_refresh };
