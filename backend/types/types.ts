// types.ts
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export interface RequestWithUser extends Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> {
  user?: any;
}

export type NextFunctionWithUser = (req: RequestWithUser, res: Response, next: NextFunction) => void;