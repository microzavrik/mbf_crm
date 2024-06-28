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

  try {
    console.log(token);
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    if (err instanceof jwt.JsonWebTokenError) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(403).json({ message: "Failed to authenticate token" });
      }
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}