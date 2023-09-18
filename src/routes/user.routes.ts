import { Router } from "express";
import { userLogin, userSignup } from "../controller/user/userSignup.controller";


const userRouter = Router();

userRouter.route("/signup").post(userSignup)
userRouter.route("/login").post(userLogin)

export default userRouter