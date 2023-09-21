import expressAsyncHandler from "express-async-handler";
import { verify } from "../../service/user.service";

export const verifyLogin = expressAsyncHandler(async (req, res) => {
  const token = req.query.token;
  await verify(token as string);

  res.send({ success: true, message: "Authentication successfull", token });
});
