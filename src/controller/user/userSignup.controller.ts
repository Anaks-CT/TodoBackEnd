import expressAsyncHandler from "express-async-handler";
import { checkExistingUser, createNewUser } from "../../helper/userCRUD";
import ErrorResponse from "../../error/errorResponse";

export const userSignup = expressAsyncHandler(async (req, res) => {
  const { userName } = req.body;

  // Check if the username already exists in the database
  const existingUser = await checkExistingUser(userName);

  if (existingUser.rowCount > 0) {
    // Username already exists, throwing an error here
    throw ErrorResponse.badRequest("Username already taken");
  }

  // If the username is unique, insert it into the database
  await createNewUser(userName);

  // Registration successful
  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});


export const userLogin = expressAsyncHandler(async (req, res) => {

  const { userName } = req.body;
  
  // Check if the username exists in the database
  const existingUser = await checkExistingUser(userName);

  if (existingUser.rowCount === 0) {
    // Username doesn't exist, throwing an error here
    throw ErrorResponse.notFound("Username not found");
  }

  // Login successful
  res.status(200).json({ success: true, message: "Login successfull" });
});
