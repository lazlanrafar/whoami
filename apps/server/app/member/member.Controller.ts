import { Request, Response } from "express";
import { InternalServerError, Ok } from "../../utils/http-response";
import {
  FetchProject,
  FetchProjectLength,
} from "../project/project.Repository";
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

    const totalRecords = await FetchProjectLength(userId as string);
    const totalPage = Math.ceil(totalRecords / _limit);

    const response = {
      pagination: {
        total_records: totalRecords,
        total_pages: totalPage,
        current_page: _page,
        per_page: _limit,
        next_page: _page < totalPage ? _page + 1 : null,
        prev_page: _page > 1 ? _page - 1 : null,
      },
      data: projects,
    };

    return Ok(res, response, "Member project fetched successfully");
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
