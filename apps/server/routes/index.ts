import { Request, Response } from "express";

export default function Routes(app: any) {
  const apiVersion = process.env.API_VERSION || "v1";
  const preRoute = `/api/${apiVersion}`;

  app.get(`${preRoute}/`, (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
}
