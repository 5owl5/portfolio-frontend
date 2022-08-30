import jwt from "jsonwebtoken";
import { tokenRefreshService } from "../services/tokenService";

function token_refresh(req, res, next) {
  let oldSend = res.send;
  res.send = async function (data) {
    res.send = oldSend;
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    const tokenUser = await tokenRefreshService.getIdByAccessToken(userToken);

    if (userToken != "null" && tokenUser) {
      try {
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const decoded = jwt.verify(userToken, secretKey);
      } catch (err) {
        let errorMessage = "토큰이 만료되었습니다.";
        let token_data = {
          errorMessage,
        };
        let margeData = { data, token_data };
        return res.send(margeData);
      }
    } else if (userToken != "null" && tokenUser == null) {
      let errorMessage = "토큰이 저장되어있지 않습니다";
      let token_data = {
        errorMessage,
      };

      let margeData = { data, token_data };
      return res.send(margeData);
    }

    try {
      return res.send(data);
    } catch (error) {
      console.log(error);
    }

    // do something with the data
  };
  next();
}
export { token_refresh };
