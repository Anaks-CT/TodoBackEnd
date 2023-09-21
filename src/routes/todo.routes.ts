import { Router } from "express";
import { createTodo } from "../controller/todo/createTodo.controller";
import { getAllUserTodo, todoService } from "../controller/todo/getTodo.controller";
import { updateTodo } from "../controller/todo/updateTodo.controller";
import { deleteTodo } from "../controller/todo/deleteTodo.controller";
import { validateBody } from "../middleware/validateBody";
import { todoSchema, todoUpdateSchema } from "../utils/SchemaValidation";
import { userVerify } from "../middleware/authMiddleware";

const todoRouter = Router();

todoRouter.route("/service").get(userVerify, todoService)
todoRouter
  .route("/:id?")
  .get(userVerify, getAllUserTodo)
  .post(userVerify, validateBody(todoSchema), createTodo)
  .patch(userVerify, validateBody(todoUpdateSchema), updateTodo)
  .delete(userVerify, deleteTodo);



export default todoRouter;
