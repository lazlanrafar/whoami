import {
  CreateSKill,
  DeleteSkill,
  EditSkill,
  GetSkill,
  GetSkillById,
} from "./skill.Controller";

import express from "express";
const skillRouter = express.Router();

skillRouter.get("/", GetSkill);
skillRouter.get("/:id", GetSkillById);
skillRouter.post("/", CreateSKill);
skillRouter.put("/:id", EditSkill);
skillRouter.delete("/:id", DeleteSkill);

export default skillRouter;
