import { GetSkill } from "./skill.Controller";

import express from "express";
const skillRouter = express.Router();

skillRouter.get("/", GetSkill);

export default skillRouter;
