import { Router } from "express";
import { createTodo } from "../controller/todo/createTodo.controller";
import { getAllUserTodo } from "../controller/todo/getTodo.controller";


const todoRouter = Router();

todoRouter.route("/:id?").get(getAllUserTodo).post(createTodo)

export default todoRouter