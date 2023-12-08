import { Request, Response } from "express";
import { AuthToken } from "../shared/middleware.shared";

import skillRouter from "../app/skill/skill.Route";
import projectRouter from "../app/project/project.Route";
import memberRouter from "../app/member/member.Route";

export default function Routes(app: any) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/${apiVersion}`;

  app.use(`${preRoute}/skill`, AuthToken, skillRouter);
  app.use(`${preRoute}/project`, AuthToken, projectRouter);

  app.use(`${preRoute}/member`, memberRouter);

  app.get(`${preRoute}/`, (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
}
