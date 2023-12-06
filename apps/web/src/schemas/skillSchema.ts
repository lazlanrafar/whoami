import { z } from "zod";

export const formSkillSchema = z.object({
  title: z.string().min(3, "Title is required"),
  year: z.number().min(1900, "Too early"),
});
