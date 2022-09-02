import { Router } from "express";
import { ProjectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.get("/users/:owner/projects", async function (req, res, next) {
  try {
    const owner = req.params.owner;

    const projects = await ProjectService.getProjects({ owner });

    res.status(200).send(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/project", async function (req, res, next) {
  try {
    const owner = req.currentUserId;

    const name = req.body.name;
    const content = req.body.content;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const createdNewProject = await ProjectService.addProject({
      owner,
      name,
      content,
      startDate,
      endDate,
    });

    res.status(201).json(createdNewProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/project/:number", async function (req, res, next) {
  try {
    const owner = req.currentUserId;
    const number = req.params.number;

    const name = req.body.name ?? null;
    const content = req.body.content ?? null;
    const startDate = req.body.startDate ?? null;
    const endDate = req.body.endDate ?? null;

    const updateContent = { name, content, startDate, endDate };

    const updatedproject = await ProjectService.updateProject({
      owner,
      number,
      updateContent,
    });

    res.status(201).json(updatedproject);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/project/:number", async function (req, res, next) {
  try {
    const owner = req.currentUserId;
    const number = req.params.number;

    const deletedProject = await ProjectService.deleteProject({
      owner,
      number,
    });

    res.status(201).json(deletedProject);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
