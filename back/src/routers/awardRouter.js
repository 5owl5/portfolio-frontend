import { Router } from "express";
import { AwardService } from "../services/awardService";
import { login_required } from "../middlewares/login_required";

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.get("/users/:owner/awards", async function (req, res, next) {
  try {
    const owner = req.params.owner;

    const awards = await AwardService.getAwards({ owner });

    res.status(200).send(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.post("/award", async function (req, res, next) {
  try {
    const owner = req.currentUserId;

    const host = req.body.host;
    const prize = req.body.prize;
    const awardedAt = req.body.awardedAt;

    const createdNewAward = await AwardService.addAward({
      owner,
      host,
      prize,
      awardedAt,
    });

    res.status(201).json(createdNewAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/award/:number", async function (req, res, next) {
  try {
    const owner = req.currentUserId;
    const number = req.params.number;

    const host = req.body.host ?? null;
    const prize = req.body.prize ?? null;
    const awardedAt = req.body.awardedAt ?? null;

    const updateContent = { host, prize, awardedAt };

    const updatedAward = await AwardService.updateAward({
      owner,
      number,
      updateContent,
    });

    res.status(201).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/award/:number", async function (req, res, next) {
  try {
    const owner = req.currentUserId;
    const number = req.params.number;

    const deletedAward = await AwardService.deleteAward({
      owner,
      number,
    });

    res.status(201).json(deletedAward);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
