import expressAsyncHandler from "express-async-handler";
import { register } from "../../service/user.service";

export const userSignup = expressAsyncHandler(async (req, res) => {
  const { userName } = req.body;

  await register(userName);

  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});
