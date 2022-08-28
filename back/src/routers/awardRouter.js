import { Router } from "express";
import { awardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";

const awardRouter = Router();

awardRouter.get("/users/:id/awards", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id

    const awards = await awardService.getAwards({ userId });

    res.status(200).send(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.post("/awards", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId

    const awards = await awardService.getAwards({ userId });
    const awardslength = awards.length;

    const awardNumber = awardslength ? awards.pop().number + 1 : 1;
    const awardHost = req.body.awardWhere;
    const awardName = req.body.awardName;
    const awardedAt = req.body.awardDate;

    const newAward = await awardService.addAward({
      userId,
      awardNumber,
      awardHost,
      awardName,
      awardedAt,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:number", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const awardNumber = req.params.number;

    const awardHost = req.body.awardWhere ?? null;
    const awardName = req.body.awardName ?? null;
    const awardedAt = req.body.awardDate ?? null;

    const updateContent = { awardHost, awardName, awardedAt };

    const updateAward = await awardService.updateAward({
      userId,
      awardNumber,
      updateContent,
    });

    res.status(201).json(updateAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:number", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const awardNumber = req.params.number;

    const deleteAward = await awardService.deleteAward({
      userId,
      awardNumber,
    });

    res.status(201).json(deleteAward);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
