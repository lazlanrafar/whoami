import { Request, Response } from "express";
import skillRouter from "../app/skill/skill.Route";
import { AuthToken } from "../shared/middleware.shared";

export default function Routes(app: any) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/skill`, AuthToken, skillRouter);

  app.get(`${preRoute}/`, (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
}
