import prisma from "../../utils/prisma";

export const FetchSkill = async () => {
  return await prisma.tbm_skill.findMany();
};
