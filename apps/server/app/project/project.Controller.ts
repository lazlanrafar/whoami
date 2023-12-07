import { Request, Response } from "express";
import { InternalServerError, Ok } from "../../utils/http-response";
import { IProject } from "../../types";
import {
  DestroyAllProjectTechnology,
  DestroyProject,
  FetchProject,
  FetchProjectById,
  StoreProject,
  StoreProjectTechnology,
} from "./project.Repository";

export const GetProject = async (req: Request, res: Response) => {
  try {
    const createdBy = req.cookies.user.id;
    const projects = await FetchProject(createdBy);

    return Ok(res, projects, "Project fetched successfully");
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

    return Ok(res, project, "Project created successfully");
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
