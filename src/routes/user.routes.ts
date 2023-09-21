import { Router } from "express";
import { userSignup } from "../controller/user/signup.controller";
import { userLogin } from "../controller/user/login.controller";
import { validateBody } from "../middleware/validateBody";
import { userSchema } from "../utils/SchemaValidation";
import { verifyLogin } from "../controller/user/verifyLogin.controller";

const userRouter = Router();

userRouter.post("/signup", validateBody(userSchema), userSignup);
userRouter.post("/login", validateBody(userSchema), userLogin);
userRouter.get("/verify", verifyLogin); 

export default userRouter;
