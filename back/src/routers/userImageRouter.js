import { Router } from "express";
import { UserImageService } from "../services/userImageService";
import { login_required } from "../middlewares/login_required";
import { upload } from "../middlewares/imageUpload";

const userImageRouter = Router();
userImageRouter.use(login_required);

userImageRouter.get("/users/:owner/image", async function (req, res, next) {
  try {
    const owner = req.params.owner;

    const image = await UserImageService.getImage({ owner });

    res.status(200).send(image);
  } catch (error) {
    next(error);
  }
});

userImageRouter.put(
  "/image",
  upload.single("userimages"),
  async function (req, res, next) {
    try {
      const owner = req.currentUserId;
      const { path, filename } = req.file;

      const checkimage = await UserImageService.getImage({ owner });

      if (!checkimage) {
        const createdNewImage = await UserImageService.addImage({
          owner,
          path,
          fileName: filename,
        });
        res.status(201).send(createdNewImage);
      } else {
        const updateContent = { path, fileName: filename };
        const updatedImage = await UserImageService.updateImage({
          owner,
          updateContent,
        });
        res.status(201).send(updatedImage);
      }
    } catch (error) {
      next(error);
    }
  }
);

userImageRouter.delete("/image", async function (req, res, next) {
  try {
    const owner = req.currentUserId;

    const deletedImage = await UserImageService.deleteImage({
      owner,
    });

    res.status(201).send(deletedImage);
  } catch (error) {
    next(error);
  }
});

export { userImageRouter };
