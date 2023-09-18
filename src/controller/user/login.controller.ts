import expressAsyncHandler from "express-async-handler";
import { login } from "../../service/user.service";

export const userLogin = expressAsyncHandler(async (req, res) => {
    const { userName } = req.body;
  
    const userId = await login(userName); // will remove this code and the code which returns in the service
  
    // Login successful
    res.status(200).json({ success: true, message: "Login successfull", userId });
  });