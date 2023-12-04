import { TypeSkill } from "../../types";
import prisma from "../../utils/prisma";

export const FetchSkill = async (created_by: string) => {
  return await prisma.tbm_skill.findMany({
    where: {
      created_by: created_by,
    },
    orderBy: {
      year: "desc",
    },
  });
};

export const StoreSKill = async (data: TypeSkill) => {
  return await prisma.tbm_skill.create({
    data: {
      title: data.title,
      year: data.year,
      created_by: data.created_by,
    },
  });
};

export const UpdateSkill = async (id: string, data: TypeSkill) => {
  return await prisma.tbm_skill.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      year: data.year,
    },
  });
};

export const DestroySkill = async (id: string) => {
  return await prisma.tbm_skill.delete({
    where: {
      id: id,
    },
  });
};
