import { Request, Response } from "express";
import { InternalServerError, Ok } from "../../utils/http-response";
import { FetchProject } from "../project/project.Repository";

export const GetMemberProject = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const projects = await FetchProject(userId);

    return Ok(res, projects, "Member project fetched successfully");
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error, "Failed to get member project");
  }
};
