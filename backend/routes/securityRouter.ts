import express, { Request, Response } from "express";
import { refreshToken } from "../jwt_token/refreshToken";
import { RequestWithUser } from "../types/types";

const router = express.Router();

router.post("/refresh-token", (req: RequestWithUser, res: Response) => {
    console.log("refresh token called");
    refreshToken(req, res);
});

export default router;