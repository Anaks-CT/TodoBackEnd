import asyncHandler from "express-async-handler";
import {Schema} from 'yup';
import { RequestHandler } from "express-serve-static-core";
import ErrorResponse from "../error/errorResponse";


export function validateBody<T> (schema: Schema<T>): RequestHandler {
    return asyncHandler(async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (err: any) {
      throw ErrorResponse.badRequest(err.errors[0]);
    }
  })}
