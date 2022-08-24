import is from "@sindresorhus/is";
import { Router } from "express";
import { EducationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";
const educationRouter = Router();
//학적 추가
educationRouter.post(
  "/edu/add",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const owner = req.currentUserId;
      const name = req.body.name;
      const major = req.body.major;
      const present = req.body.present;
      const newEducation = await EducationService.addEdcation({
        owner,
        name,
        major,
        present,
      });
      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);
//소유자 id로 조회
educationRouter.get("/edu/:owner", async function (req, res, next) {
  try {
    const owner = req.params.owner;
    const getEduList = await EducationService.getOwnerEducation({ owner });
    res.status(200).send(getEduList);
  } catch (err) {
    next(err);
  }
});
// 학적 id로 조회
educationRouter.get("/edu/id/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const getEduList = await EducationService.getIdEducation({ id });
    res.status(200).send(getEduList);
  } catch (err) {
    next(err);
  }
});
//로그인된 id의 학적 조회
educationRouter.get("/edu", login_required, async function (req, res, next) {
  try {
    const owner = req.currentUserId;
    const getEduList = await EducationService.getOwnerEducation({ owner });
    res.status(200).send(getEduList);
  } catch (err) {
    next(err);
  }
});

//학적사항 수정 기능
educationRouter.put(
  "/edu/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      const owner = req.currentUserId;
      const name = req.body.name ?? null;
      const major = req.body.major ?? null;
      const present = req.body.present ?? null;
      const toUpdate = {
        owner: owner,
        name: name,
        major: major,
        present: present,
      };
      const updatedEducation = await EducationService.setEducation({
        id,
        toUpdate,
      });
      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }
      res.status(200).json(updatedEducation);
    } catch (err) {
      next(err);
    }
  }
);

export { educationRouter };
