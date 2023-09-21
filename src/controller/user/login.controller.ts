import expressAsyncHandler from "express-async-handler";
import { login } from "../../service/user.service";

export const userLogin = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const message = await login(email);

  // sent the verify link to email
  res.send({ success: true, message });
});
