import { Request, Response } from "express";
import { FetchSkill, StoreSKill, UpdateSkill } from "./skill.Repository";
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
    return InternalServerError(res, error, "Failed Create Skill");
  }
};

export const EditSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: TypeSkill = req.body;

    await UpdateSkill(id, data);

    return Ok(res, {}, "Success Update Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Update Skill");
  }
};
