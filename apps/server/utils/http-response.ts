import { Response } from "express";

export const Ok = (res: Response, data: any, message: string) => {
  const response = {
    status: 200,
    message: message ?? "Berhasil",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};

export const Created = (res: Response, data: any, message: string) => {
  const response = {
    status: 201,
    message: message ?? "Berhasil",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};

export const BadRequest = (res: Response, data: any, message: string) => {
  const response = {
    status: 400,
    message: message ?? "Bad Request",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};

export const Unauthorized = (res: Response, data: any, message: string) => {
  const response = {
    status: 401,
    message: message ?? "Unauthorized",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};

export const Forbidden = (res: Response, data: any, message: string) => {
  const response = {
    status: 403,
    message: message ?? "Forbidden",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};

export const NotFound = (res: Response, data: any, message: string) => {
  const response = {
    status: 404,
    message: message ?? "Not Found",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};

export const InternalServerError = (
  res: Response,
  data: any,
  message: string
) => {
  const response = {
    status: 500,
    message: message ?? "Internal Server Error",
    data: data ?? {},
  };
  res.status(response.status).json(response);
};
