import { GetMemberProject } from "./member.Controller";

import express from "express";
const memberRouter = express.Router();

memberRouter.get("/:userId", (req, res) => {
  res.send("Welcome to Whoami API");
});
memberRouter.get("/:userId/projects", GetMemberProject);

export default memberRouter;
