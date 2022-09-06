import is from "@sindresorhus/is";
import { Router } from "express";
import { CertificateService } from "../services/certificateService";
import { login_required } from "../middlewares/login_required";
const certificateRouter = Router();
//학적 추가
certificateRouter.post(
  "/certificate",
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
      const description = req.body.description;
      const acquisitionDate = req.body.acquisitionDate;
      const newCertificate = await CertificateService.addCertificate({
        owner,
        name,
        description,
        acquisitionDate,
      });
      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }
      res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
  }
);
//소유자 _id로 조회
certificateRouter.get(
  "/users/:owner/certificate",
  async function (req, res, next) {
    try {
      const owner = req.params.owner;
      const getCerList = await CertificateService.getUserCertificate({
        owner,
      });
      res.status(200).send(getCerList);
    } catch (err) {
      next(err);
    }
  }
);
// 학적 _id로 조회
certificateRouter.get("/certificate/:_id", async function (req, res, next) {
  try {
    const _id = req.params._id;
    const getCerList = await CertificateService.getCertificate({ _id });
    res.status(200).send(getCerList);
  } catch (err) {
    next(err);
  }
});

//학적사항 수정 기능
certificateRouter.put(
  "/certificate/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;
      const owner = req.currentUserId;
      const name = req.body.name ?? null;
      const description = req.body.description ?? null;
      const acquisitionDate = req.body.acquisitionDate ?? null;
      const toUpdate = {
        owner: owner,
        name: name,
        description: description,
        acquisitionDate: acquisitionDate,
      };
      const updatedCertificate = await CertificateService.setCertificate({
        _id,
        toUpdate,
      });
      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }
      res.status(200).json(updatedCertificate);
    } catch (err) {
      next(err);
    }
  }
);

certificateRouter.delete(
  "/certificate/:_id",
  login_required,
  async function (req, res, next) {
    try {
      const _id = req.params._id;
      const owner = req.currentUserId;
      const deleteCer = await CertificateService.deleteIdCertificate({
        _id,
        owner,
      });
      res.status(200).send(deleteCer);
    } catch (err) {
      next(err);
    }
  }
);

export { certificateRouter };
