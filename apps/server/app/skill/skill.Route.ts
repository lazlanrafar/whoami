import { CreateSKill, GetSkill } from "./skill.Controller";

import express from "express";
const skillRouter = express.Router();

skillRouter.get("/", GetSkill);
skillRouter.post("/", CreateSKill);

export default skillRouter;
