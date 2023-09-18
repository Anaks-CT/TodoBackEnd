import ErrorResponse from "../error/errorResponse";
import { checkExistingUser, createNewUser } from "../helper/userCRUD";

export const register = async (userName: string) => {
  // Check if the username already exists in the database
  const existingUser = await checkExistingUser(userName);
  console.log(existingUser)

  if (existingUser.rowCount > 0)
    // Username already exists, throwing an error here
    throw ErrorResponse.badRequest("Username already taken");

  // If the username is unique, insert it into the database
  await createNewUser(userName);
};

export const login = async (userName: string) => {
  // Check if the username exists in the database
  const existingUser = await checkExistingUser(userName);

  if (existingUser.rowCount === 0)
    // Username doesn't exist, throwing an error here
    throw ErrorResponse.notFound("Username not found");

    const {id} = existingUser.rows[0]
    return id
};
