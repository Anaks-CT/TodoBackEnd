import { Router } from "express";


const todoRouter = Router();

todoRouter.route("/:id?").post()

export default todoRouter