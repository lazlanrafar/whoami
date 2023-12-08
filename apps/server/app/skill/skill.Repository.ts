import { ISkill } from "../../types";
import prisma from "../../utils/prisma";

export const FetchSkill = async ({
  created_by,
  limit,
  page,
  search,
}: {
  created_by: string;
  search?: string;
  limit?: string;
  page?: string;
}) => {
  return await prisma.tbm_skill.findMany({
    where: {
      created_by: created_by,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      year: "asc",
    },
    ...(limit && {
      take: +limit,
    }),
    ...(page &&
      limit && {
        skip: (+page - 1) * +limit,
      }),
  });
};

export const FetchSkillById = async (id: string) => {
  return await prisma.tbm_skill.findUnique({
    where: {
      id: id,
    },
  });
};

export const StoreSKill = async (data: ISkill) => {
  return await prisma.tbm_skill.create({
    data: {
      title: data.title,
      year: data.year,
      created_by: data.created_by,
    },
  });
};

export const UpdateSkill = async (id: string, data: ISkill) => {
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
