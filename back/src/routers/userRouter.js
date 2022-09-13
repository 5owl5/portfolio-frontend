import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

import { MailAuthService } from "../services/mailAuthService";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { name, email, password, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// likes 관리 컴포넌트
// 현재 상태를 나타내는 status와 likeCount 반환
// user의 status, likeCount 정보 갱신

userAuthRouter.put(
  "/like/:id",
  login_required,
  async function (req, res, next) {
    try {
      // 좋아요 클릭한 유저의 id
      const currentUserId = req.params.id;
      // 좋아요 받은 사람의 id
      const otherUserId = req.body.otherUserId;
      // 현재 상태를 나타내는 status와 likeCount 반환
      const updatedUser = await userAuthService.setLike({
        currentUserId,
        otherUserId,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

// likeCount 반환 컴포넌트
// 현재 상태를 나타내는 status와 likeCount 반환
userAuthRouter.get(
  "/like/:id",
  login_required,
  async function (req, res, next) {
    try {
      // 좋아요를 받은 사람의 id
      const otherUserId = req.params.id;
      const currentUserId = req.currentUserId;

      const updatedLike = await userAuthService.getLike({
        currentUserId,
        otherUserId,
      });
      res.status(200).json(updatedLike);
    } catch (error) {
      next(error);
    }
  }
);

// 유저 삭제 컴포넌트
userAuthRouter.delete("/users/:id", async function (req, res, next) {
  try {
    const user_id = req.params.id;
    await userAuthService.deleteUser({ user_id });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

userAuthRouter.post(
  "/user/register/emailAuth",
  async function (req, res, next) {
    const email = req.body.email;

    const generateRandom = (min, max) => {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    };

    const randomNumber = generateRandom(111111, 999999);

    try {
      const sendMail = MailAuthService.sendMail({ email, randomNumber });

      if (sendMail.errorMessage) {
        throw new Error(sendMail.errorMessage);
      }

      res.status(200).json(randomNumber);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
