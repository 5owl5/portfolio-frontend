import { Router } from "express";
import { projectService } from "../services/projectService";
import { login_required } from "../middlewares/login_required";

const projectRouter = Router();

projectRouter.get("/users/:id/projects", login_required, async function (req, res, next) {
  try {
    const userId = req.params.id

    const projects = await projectService.getProject({ userId });

    res.status(200).send(projects); // list형태로 send
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/projects", login_required,async function (req, res, next) {
  try {
    const userId = req.currentUserId

    const projects = await projectService.getProject({ userId });
    const projectslength = projects.length;

    const projectNumber = projectslength ? projects.pop().number + 1 : 1;
    const projectName = req.body.projectName;
    const content = req.body.content;
    const startpoint = req.body.startpoint;
    const endpoint = req.body.endpoint;

    const newProject = await projectService.addProject({
      userId,
      projectNumber,
      projectName,
      content,
      startpoint,
      endpoint,
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/projects/:number", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const projectNumber = req.params.number;

    const projectName = req.body.projectName ?? null;
    const content = req.body.content ?? null;
    const startpoint = req.body.startpoint ?? null;
    const endpoint = req.body.endpoint ?? null;

    const updateContent = { projectName, content, startpoint, endpoint };

    const updateProject = await projectService.updateProject({
      userId,
      projectNumber,
      updateContent,
    });

    res.status(201).json(updateProject);
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/projects/:number", login_required, async function (req, res, next) {
  try {
    const userId = req.currentUserId
    const projectNumber = req.params.number;

    const deleteProject = await projectService.deleteProject({
      userId,
      projectNumber,
    });

    res.status(201).json(deleteProject);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
