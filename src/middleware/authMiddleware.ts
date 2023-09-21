import expressAsyncHandler from "express-async-handler";
import ErrorResponse from "../error/errorResponse";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { checkExistingUserWithUserId } from "../helper/userCRUD";

export interface RequestWithUser extends Request {
  user?: any;
}

export const authMiddleware = expressAsyncHandler(
  async (req: RequestWithUser, res, next) => {
    try {
      if (!req.headers?.authorization)
        throw ErrorResponse.unauthorized("Access Denied");
      const token = req.headers.authorization.replace("Bearer ", "");
      if (!token) {
        throw ErrorResponse.unauthorized(
          "Authorization Failed !! Please Login"
        );
      }
      const secret = process.env.JWT_SECRET;
      if (!secret) throw ErrorResponse.unauthorized("JWT Secret not found");
      jwt.verify(token, secret, (err, user) => {
        if (err || !user || typeof user === "string" || !user?._id) {
          next(
            ErrorResponse.unauthorized("Authorization Failed !! Please Login")
          );
        }
        req.user = user;
        next();
      });
    } catch (err: any) {
      next(ErrorResponse.unauthorized(err.message));
    }
  }
);

export const userVerify = expressAsyncHandler(
  async (req: RequestWithUser, res, next) => {
    try {
      authMiddleware(req, res, (err) => {
        if (err) return next(err);
        if (!req.user._id)
          return next(ErrorResponse.unauthorized("You are not Authenticated"));

          checkExistingUserWithUserId(req.user._id)
          .then((res) => {
            // throwing error if the user doesn't exist with the give user id
            if (res.rowCount === 0) throw ErrorResponse.unauthorized("Unauthorized");
            req.user = res;
            return next();
          })
          .catch((err) => next(err));
      });
    } catch (err: any) {
      next(err);
    }
  }
);
