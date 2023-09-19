import expressAsyncHandler from "express-async-handler";
import { login } from "../../service/user.service";

export const userLogin = expressAsyncHandler(async (req, res) => {
    const { userName } = req.body;
  
    const userId = await login(userName); // will remove this code and the code which returns in the service
  
    // Login successful
    res.send({ success: true, message: "Login successfull", userId });
  });