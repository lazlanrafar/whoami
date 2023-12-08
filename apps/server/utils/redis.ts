import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({
  url: redisUrl,
});

const EXPIRED_TIME = 60 * 60 * 24;

export const SetRedis = async (key: string, value: string) => {
  try {
    await redisClient.set(key, value);
    await redisClient.expire(key, EXPIRED_TIME);

    return true;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const GetRedis = async (key: string) => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    throw new Error(error as any);
  }
};
