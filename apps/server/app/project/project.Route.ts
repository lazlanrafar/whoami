import { uploadThumbnail } from "../../utils/multer";
import { CreateProject } from "./project.Controller";

import express from "express";
const projectRouter = express.Router();

projectRouter.post("/", uploadThumbnail.single("thumbnail"), CreateProject);

export default projectRouter;
