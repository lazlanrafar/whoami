import { Request, Response } from "express";
import skillRouter from "../app/skill/skill.Route";

export default function Routes(app: any) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/skill`, skillRouter);

  app.get(`${preRoute}/`, (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
}
