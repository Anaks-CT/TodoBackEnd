import { Router } from "express";
import { createTodo } from "../controller/todo/createTodo.controller";
import { getAllUserTodo } from "../controller/todo/getTodo.controller";
import { updateTodo } from "../controller/todo/updateTodo.controller";
import { deleteTodo } from "../controller/todo/deleteTodo.controller";

const todoRouter = Router();

todoRouter
  .route("/:id?")
  .get(getAllUserTodo)
  .post(createTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

export default todoRouter;
