import { Request, Response } from "express";
import { AuthToken } from "../shared/middleware.shared";

import skillRouter from "../app/skill/skill.Route";
import projectRouter from "../app/project/project.Route";

export default function Routes(app: any) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/skill`, AuthToken, skillRouter);
  app.use(`${preRoute}/project`, AuthToken, projectRouter);

  app.get(`${preRoute}/`, (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
}
