import { Request, Response } from "express";
import { InternalServerError, Ok } from "../../utils/http-response";
import { IApiParams, IProject } from "../../types";
import {
  DestroyAllProjectTechnology,
  DestroyProject,
  FetchProject,
  FetchProjectById,
  FetchProjectLength,
  StoreProject,
  StoreProjectTechnology,
  UpdateProject,
} from "./project.Repository";

export const GetProject = async (req: Request, res: Response) => {
  try {
    const createdBy = req.cookies.user.id;

    const { search, page, limit } = req.query;

    const _page = page ? parseInt(page as string) : 1;
    const _limit = limit ? parseInt(limit as string) : 10;

    const projects = await FetchProject({
      created_by: createdBy as string,
      search: search as string,
      limit: _limit,
      page: _page,
    });

    const totalRecords = await FetchProjectLength(createdBy as string);
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

    return Ok(res, response, "Project fetched successfully");
  } catch (error) {
    return InternalServerError(res, error, "Failed to get project");
  }
};

export const GetProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await FetchProjectById(id);

    return Ok(res, project, "Project fetched successfully");
  } catch (error) {
    return InternalServerError(res, error, "Failed to get project");
  }
};

export const CreateProject = async (req: Request, res: Response) => {
  try {
    const data: IProject = req.body;

    if (req.file) data.thumbnail = req.file.filename;
    else data.thumbnail = "";

    data.created_by = req.cookies.user.id;
    const project = await StoreProject(data);

    if (data.technology && data.technology.length > 0) {
      for (const iterator of data.technology as string[]) {
        await StoreProjectTechnology({
          project_id: project.id,
          skill_id: iterator as string,
        });
      }
    }

    return Ok(res, {}, "Project created successfully");
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error, "Failed to create project");
  }
};

export const EditProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: IProject = req.body;

    const oldProject = await FetchProjectById(id);

    if (req.file) data.thumbnail = req.file.filename;
    else data.thumbnail = oldProject?.thumbnail || "";

    await UpdateProject(id, data);

    await DestroyAllProjectTechnology(id);
    if (data.technology && data.technology.length > 0) {
      for (const iterator of data.technology as string[]) {
        await StoreProjectTechnology({
          project_id: id,
          skill_id: iterator as string,
        });
      }
    }

    return Ok(res, {}, "Project created successfully");
  } catch (error) {
    console.log(error);
    return InternalServerError(res, error, "Failed to create project");
  }
};

export const DeleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await DestroyAllProjectTechnology(id);
    await DestroyProject(id);

    return Ok(res, null, "Project deleted successfully");
  } catch (error) {
    return InternalServerError(res, error, "Failed to delete project");
  }
};
