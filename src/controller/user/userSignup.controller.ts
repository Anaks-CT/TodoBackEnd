import expressAsyncHandler from "express-async-handler";
import { checkExistingUser, createNewUser } from "../../helper/userCRUD";
import ErrorResponse from "../../error/errorResponse";
import { login, register } from "../../service/user.service";

export const userSignup = expressAsyncHandler(async (req, res) => {
  const { userName } = req.body;

  await register(userName);

  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

export const userLogin = expressAsyncHandler(async (req, res) => {
  const { userName } = req.body;

  await login(userName);

  // Login successful
  res.status(200).json({ success: true, message: "Login successfull" });
});
