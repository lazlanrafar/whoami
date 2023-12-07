import { CreateProject } from "./project.Controller";

import express from "express";
const projectRouter = express.Router();

projectRouter.post("/", CreateProject);

export default projectRouter;
