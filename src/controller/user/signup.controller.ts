import expressAsyncHandler from "express-async-handler";
import { register } from "../../service/user.service";

export const userSignup = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  await register(email);

  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});
