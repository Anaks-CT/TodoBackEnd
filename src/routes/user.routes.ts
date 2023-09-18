import { Router } from "express";
import { userSignup } from "../controller/user/signup.controller";
import { userLogin } from "../controller/user/login.controller";


const userRouter = Router();

userRouter.route("/signup").post(userSignup)
userRouter.route("/login").post(userLogin)

export default userRouter