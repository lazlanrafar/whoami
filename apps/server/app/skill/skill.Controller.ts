import { Request, Response } from "express";
import { FetchSkill, StoreSKill } from "./skill.Repository";
import { InternalServerError, Ok } from "../../utils/http-response";
import { TypeSkill } from "../../types";

export const GetSkill = async (req: Request, res: Response) => {
  try {
    const result: TypeSkill[] = await FetchSkill();

    return Ok(res, result, "Success Get Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Get Skill");
  }
};

export const CreateSKill = async (req: Request, res: Response) => {
  try {
    const data: TypeSkill = req.body;

    await StoreSKill(data);

    return Ok(res, {}, "Success Create Skill");
  } catch (error) {
    console.log(error);

    return InternalServerError(res, error, "Failed Create Skill");
  }
};
