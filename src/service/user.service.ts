import ErrorResponse from "../error/errorResponse";
import {
  checkExistingUser,
  checkExistingUserWithUserId,
  createNewUser,
} from "../helper/userCRUD";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendMagicLinkEmail } from "../utils/magicEmail";
import { signToken, verifyToken } from "../utils/jwtTokenManage";

export const register = async (email: string) => {
  // Check if the email already exists in the database
  const existingUser = await checkExistingUser(email);

  if (existingUser.rowCount > 0)
    // email already exists, throwing an error here
    throw ErrorResponse.badRequest("Email already taken");

  // If the email is unique, insert it into the database
  await createNewUser(email);
};

export const login = async (email: string) => {
  // Check if the email exists in the database
  const existingUser = await checkExistingUser(email);

  if (existingUser.rowCount === 0)
    // email doesn't exist, throwing an error here
    throw ErrorResponse.notFound("User not found");

  const { id } = existingUser.rows[0];

  // signing up the token
  const token = signToken(id);

  // sending magic email to login
  await sendMagicLinkEmail({ email, token });

  return "Please login through verify link sent to the email";
};

export const verify = async (token: string) => {
  if (!token) throw ErrorResponse.unauthorized("Unauthorized");

  const { _id } = verifyToken(token) as JwtPayload; // decoded token
  const user = await checkExistingUserWithUserId(_id);

  // throwing error if the user doesn't exist with the give user id
  if (user.rowCount === 0) throw ErrorResponse.unauthorized("Unauthorized");

  return token
};
