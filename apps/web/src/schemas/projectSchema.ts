import { z } from "zod";

export const formProjectSchema = z.object({
  thumbnail: z.any().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string(),
  source_code: z.string(),
});
