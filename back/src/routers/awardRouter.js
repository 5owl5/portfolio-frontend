import { Router } from "express";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.get("/", async function (req, res, next) {
  try {
    const userId = req.header("userId") // 헤더에서 정보 받아오기

    const awards = await awardService.getAward({ userId });

    res.status(200).send(awards); // list형태로 send
  } catch (error) {
    next(error);
  }
});

awardRouter.post("/", async function (req, res, next) {
  try {
    const userId = req.header("userId")

    const awards = await awardService.getAward({ userId });
    const awardslength = awards.length;

    const awardNumber = awardslength ? awards.pop().awardNumber + 1 : 1;
    const awardWhere = req.body.awardWhere;
    const awardName = req.body.awardName;
    const awardDate = req.body.awardDate;

    const newAward = await awardService.addAward({
      userId,
      awardNumber,
      awardWhere,
      awardName,
      awardDate,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/:number", async function (req, res) {
  try {
    const userId = req.header("userId")
    const awardNumber = req.params.number;

    const awardWhere = req.body.awardWhere ?? null;
    const awardName = req.body.awardName ?? null;
    const awardDate = req.body.awardDate ?? null;

    const updateContent = { awardWhere, awardName, awardDate };

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

export { awardRouter };
