import { Router } from "express";
import { userSignup } from "../controller/user/signup.controller";
import { userLogin } from "../controller/user/login.controller";
import { validateBody } from "../middleware/validateBody";
import { userSchema } from "../utils/SchemaValidation";


const userRouter = Router();

userRouter.route("/signup").post(validateBody(userSchema), userSignup)
userRouter.route("/login").post(validateBody(userSchema), userLogin)

export default userRouter