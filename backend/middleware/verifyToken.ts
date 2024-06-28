import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

interface RequestWithUser extends Request {
  user?: any;
}

export function verifyToken(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  console.log(token);
  try {
    // Верифицируем токен
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
}