import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log des erreurs pour le débogage
  res.status(500).json({ error: "Something went wrong!" });
};
