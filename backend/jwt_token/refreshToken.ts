import { Request, Response } from "express";
import jwt, { JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { config } from "../config";
import { getUserById } from "../models/userRepository";

export async function refreshToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
  
      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
        const userId = decoded.userId;
        console.log("UserId: ", userId);
  
        // Получаем пользователя по userId
        const user = await getUserById(userId);
        if (user) {
          // Генерируем новый токен для пользователя
          const newToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
            expiresIn: "1h",
          });
          return res.json({ token: newToken });
        }
  
        // Если пользователь не найден, возвращаем ошибку 401
        return res.status(401).json({ message: "Invalid token" });
      } catch (err) {
        if (err instanceof JsonWebTokenError) {
          // Если токен недействителен, возвращаем ошибку 401
          return res.status(401).json({ message: "Invalid token" });
        } else {
          // Если произошла другая ошибка, возвращаем ответ с кодом 500 Internal Server Error
          console.error("Error refreshing token:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };