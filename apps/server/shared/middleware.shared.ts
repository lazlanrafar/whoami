import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "../utils/http-response";
import supabase from "../utils/supabase";
import { GetRedis, SetRedis } from "../utils/redis";

export const AuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const BearerToken = req.headers.authorization;
  if (!BearerToken) return Unauthorized(res, {}, "Unauthorized");

  const token = BearerToken.split(" ")[1];

  try {
    const useFromRedis = await GetRedis(token);

    if (useFromRedis) {
      req.cookies.user = JSON.parse(useFromRedis);
      return next();
    }

    const {
      data: { user },
    } = await supabase.auth.getUser(token);
    if (!user) return Unauthorized(res, {}, "Unauthorized");

    await SetRedis(token, JSON.stringify(user));

    req.cookies.user = user;

    next();
  } catch (error) {
    console.log("error", error);

    return Unauthorized(res, {}, "Unauthorized");
  }
};
