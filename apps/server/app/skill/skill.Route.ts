import {
  CreateSKill,
  DeleteSkill,
  EditSkill,
  GetSkill,
} from "./skill.Controller";

import express from "express";
const skillRouter = express.Router();

skillRouter.get("/", GetSkill);
skillRouter.post("/", CreateSKill);
skillRouter.put("/:id", EditSkill);
skillRouter.delete("/:id", DeleteSkill);

export default skillRouter;
