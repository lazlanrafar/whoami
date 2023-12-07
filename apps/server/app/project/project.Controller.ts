import { Request, Response } from "express";
import { InternalServerError, Ok } from "../../utils/http-response";
import { IProject } from "../../types";
import { StoreProject, StoreProjectTechnology } from "./project.Repository";
import { handleUploadThumbnail } from "../../utils/multer";

export type UploadedFile = {
  fieldname: string; // file
  originalname: string; // myPicture.png
  encoding: string; // 7bit
  mimetype: string; // image/png
  destination: string; // ./public/uploads
  filename: string; // 1571575008566-myPicture.png
  path: string; // public/uploads/1571575008566-myPicture.png
  size: number; // 1255
};

export const CreateProject = async (req: Request, res: Response) => {
  try {
    const data: IProject = req.body;

    const uploadResult = await handleUploadThumbnail(req, res);
    const file: UploadedFile = uploadResult.file;

    data.thumbnail = file.filename;
    const project = await StoreProject(data);

    for (const iterator of data.technology as string[]) {
      await StoreProjectTechnology({
        project_id: project.id,
        skill_id: iterator as string,
      });
    }

    return Ok(res, project, "Project created successfully");
  } catch (error) {
    return InternalServerError(res, error, "Failed to create project");
  }
};
