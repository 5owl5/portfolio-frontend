import { Router } from "express";
import { awardService } from "../services/awardService";

const awardRouter = Router({ mergeParams: true }); //Router의 자식 라우터가 params를 받을 수 있게

awardRouter.get("/", async function (req, res, next) {
  try {
    const userId = req.currentUserId;

    const awards = await awardService.getAward({ userId });

    res.status(200).send(awards); // list형태로 send
  } catch (error) {
    next(error);
  }
});

awardRouter.post("/", async function (req, res, next) {
  try {
    const userId = req.currentUserId;

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
    const userId = req.currentUserId;
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
