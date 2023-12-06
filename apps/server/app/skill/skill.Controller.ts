import { Request, Response } from "express";
import {
  DestroySkill,
  FetchSkill,
  FetchSkillById,
  StoreSKill,
  UpdateSkill,
} from "./skill.Repository";
import { InternalServerError, Ok } from "../../utils/http-response";
import { ISkill } from "../../types";

export const GetSkill = async (req: Request, res: Response) => {
  try {
    const created_by = req.cookies.user.id;
    const result: ISkill[] = await FetchSkill(created_by);

    const yearNow = new Date().getFullYear();
    result.map((item) => {
      item.level = yearNow - item.year + 1;
    });

    return Ok(res, result, "Success Get Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Get Skill");
  }
};

export const GetSkillById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await FetchSkillById(id);

    return Ok(res, result, "Success Get Skill By Id");
  } catch (error) {
    return InternalServerError(res, error, "Failed Get Skill By Id");
  }
};

export const CreateSKill = async (req: Request, res: Response) => {
  try {
    const data: ISkill = req.body;

    data.created_by = req.cookies.user.id;
    await StoreSKill(data);

    return Ok(res, {}, "Success Create Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Create Skill");
  }
};

export const EditSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: ISkill = req.body;

    await UpdateSkill(id, data);

    return Ok(res, {}, "Success Update Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Update Skill");
  }
};

export const DeleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await DestroySkill(id);

    return Ok(res, {}, "Success Delete Skill");
  } catch (error) {
    return InternalServerError(res, error, "Failed Delete Skill");
  }
};
