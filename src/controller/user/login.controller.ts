import expressAsyncHandler from "express-async-handler";
import { login } from "../../service/user.service";

export const userLogin = expressAsyncHandler(async (req, res) => {
    const { userName } = req.body;
  
    await login(userName);
  
    // Login successful
    res.status(200).json({ success: true, message: "Login successfull" });
  });