import { Request, Response } from "express";
import { FetchSkill } from "./skill.Repository";
import { InternalServerError, Ok } from "../../utils/http-response";

export const GetSkill = async (req: Request, res: Response) => {
  try {
    const result = await FetchSkill();

    return Ok(res, result, "Success Get Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Get Skill");
  }
};
