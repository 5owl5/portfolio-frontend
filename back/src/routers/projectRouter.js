import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { projectService } from "../services/projectService";

const projectRouter = Router({ mergeParams: true }); //Router의 자식 라우터가 params를 받을 수 있게

projectRouter.get("/", async function (req, res, next) {
  try {
    const user_id = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ user_id });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    const projects = await projectService.getProject({
      userSchema: currentUserInfo,
    });

    res.status(200).send(projects);
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/", async function (req, res) {
  const user_id = req.params.id;
  const currentUserInfo = await userAuthService.getUserInfo({ user_id });

  if (currentUserInfo.errorMessage) {
    throw new Error(currentUserInfo.errorMessage);
  }

  const projects = await projectService.getProject({
    userSchema: currentUserInfo,
  });

  const projectNumber = projects.length + 1;
  const projectName = req.body.projectName;
  const content = req.body.content;
  const startpoint = req.body.startpoint;
  const endpoint = req.body.endpoint;

  const newProject = await projectService.addProject({
    userSchema: currentUserInfo,
    projectNumber,
    projectName,
    content,
    startpoint,
    endpoint,
  });

  res.status(200).json(newProject);
});

projectRouter.put("/:number", async function (req, res) {
  const user_id = req.params.id;
  const projectNumber = req.params.number;

  const currentUserInfo = await userAuthService.getUserInfo({ user_id });

  const projectName = req.body.projectName ?? null;
  const content = req.body.content ?? null;
  const startpoint = req.body.startpoint ?? null;
  const endpoint = req.body.endpoint ?? null;

  const updateContent = { projectName, content, startpoint, endpoint };

  const updateProject = await projectService.updateProject({
    userSchema: currentUserInfo,
    projectNumber,
    updateContent,
  });

  res.status(200).json(updateProject);
});

export { projectRouter };
