import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import Routes from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.API_PORT;

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

Routes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
