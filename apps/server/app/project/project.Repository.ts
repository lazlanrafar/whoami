import { IProject, IProjectTechnology } from "../../types";
import prisma from "../../utils/prisma";

export const FetchProject = async (created_by: string) => {
  return await prisma.tbl_project.findMany({
    where: {
      created_by: created_by,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const StoreProject = async (data: IProject) => {
  return await prisma.tbl_project.create({
    data: {
      title: data.title,
      thumbnail: data.thumbnail,
      description: data.description,
      source_code: data.source_code,
      url: data.url,
      created_by: data.created_by,
    },
  });
};

export const StoreProjectTechnology = async (data: IProjectTechnology) => {
  return await prisma.tbl_project_technology.create({
    data: {
      project_id: data.project_id,
      skill_id: data.skill_id,
    },
  });
};

export const DestroyAllProjectTechnology = async (project_id: string) => {
  return await prisma.tbl_project_technology.deleteMany({
    where: {
      project_id: project_id,
    },
  });
};
