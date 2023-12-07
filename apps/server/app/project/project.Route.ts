import { uploadThumbnail } from "../../utils/multer";
import {
  CreateProject,
  DeleteProject,
  GetProject,
  GetProjectById,
} from "./project.Controller";

import express from "express";
const projectRouter = express.Router();

projectRouter.get("/", GetProject);
projectRouter.get("/:id", GetProjectById);
projectRouter.post("/", uploadThumbnail.single("thumbnail"), CreateProject);
projectRouter.delete("/:id", DeleteProject);

export default projectRouter;
