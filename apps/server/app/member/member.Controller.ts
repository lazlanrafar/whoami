import { Request, Response } from "express";
import { InternalServerError, Ok } from "../../utils/http-response";
import { FetchProject } from "../project/project.Repository";
import { FetchSkill } from "../skill/skill.Repository";

export const GetMemberProject = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { search, page, limit } = req.query;

    const _page = page ? parseInt(page as string) : 1;
    const _limit = limit ? parseInt(limit as string) : 10;

    const projects = await FetchProject({
      created_by: userId as string,
      search: search as string,
      limit: _limit,
      page: _page,
    });

    return Ok(res, projects, "Member project fetched successfully");
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error, "Failed to get member project");
  }
};

export const GetMemberSkill = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { search, page, limit } = req.query;

    const skills = await FetchSkill({
      created_by: userId as string,
      search: search as string,
      limit: limit as string,
      page: page as string,
    });

    return Ok(res, skills, "Member project fetched successfully");
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error, "Failed to get member project");
  }
};
