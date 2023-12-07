import { uploadThumbnail } from "../../utils/multer";
import { CreateProject, GetProject } from "./project.Controller";

import express from "express";
const projectRouter = express.Router();

projectRouter.get("/", GetProject);
projectRouter.post("/", uploadThumbnail.single("thumbnail"), CreateProject);

export default projectRouter;
