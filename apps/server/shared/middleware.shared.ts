import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utils/http-response";
import supabase from "../utils/supabase";

export const AuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const BearerToken = req.headers.authorization;
  if (!BearerToken) return Unauthorized(res, {}, "Unauthorized");

  const token = BearerToken.split(" ")[1];

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    if (!user) return Unauthorized(res, {}, "Unauthorized");

    req.cookies.user = user;

    next();
  } catch (error) {
    return Unauthorized(res, {}, "Unauthorized");
  }
};
