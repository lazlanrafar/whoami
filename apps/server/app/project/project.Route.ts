import { uploadThumbnail } from "../../utils/multer";
import {
  CreateProject,
  DeleteProject,
  EditProject,
  GetProject,
  GetProjectById,
} from "./project.Controller";

import express from "express";
const projectRouter = express.Router();

projectRouter.get("/", GetProject);
projectRouter.get("/:id", GetProjectById);
projectRouter.post("/", uploadThumbnail.single("thumbnail"), CreateProject);
projectRouter.put("/:id", uploadThumbnail.single("thumbnail"), EditProject);
projectRouter.delete("/:id", DeleteProject);

export default projectRouter;
