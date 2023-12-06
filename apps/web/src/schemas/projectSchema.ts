import { z } from "zod";

export const formProjectSchema = z.object({
  thumbnail: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().min(1),
  source_code: z.string().min(1),
});
