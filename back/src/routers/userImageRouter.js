import { Router } from "express";
import { userImageService } from "../services/userImageService";
import { login_required } from "../middlewares/login_required";
import { upload } from "../middlewares/imageUpload";

const userImageRouter = Router();

userImageRouter.get(
  "/users/:id/image",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.id;

      const image = await userImageService.getImage({ userId });

      res.status(200).send(image);
    } catch (error) {
      next(error);
    }
  }
);

userImageRouter.put(
  "/image",
  login_required,
  upload.single("userimages"),
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;
      const { path, filename } = req.file;

      const checkimage = await userImageService.getImage({ userId });

      if (!checkimage) {
        const newImage = await userImageService.addImage({
          userId,
          path,
          fileName: filename,
        });
        res.status(201).send(newImage);
      } else {
        const updateContent = { path, fileName: filename };
        const updateImage = await userImageService.updateImage({
          userId,
          updateContent,
        });
        res.status(201).send(updateImage);
      }
    } catch (error) {
      next(error);
    }
  }
);

userImageRouter.delete(
  "/image",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.currentUserId;

      const deleteImage = await userImageService.deleteImage({
        userId,
      });

      res.status(201).send(deleteImage);
    } catch (error) {
      next(error);
    }
  }
);

export { userImageRouter };
