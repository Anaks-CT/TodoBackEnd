import { Router } from "express";
import { createTodo } from "../controller/todo/createTodo.controller";
import { getAllUserTodo, todoService } from "../controller/todo/getTodo.controller";
import { updateTodo } from "../controller/todo/updateTodo.controller";
import { deleteTodo } from "../controller/todo/deleteTodo.controller";
import { validateBody } from "../middleware/validateBody";
import { todoSchema, todoUpdateSchema } from "../utils/SchemaValidation";

const todoRouter = Router();

todoRouter
  .route("/:id?")
  .get(getAllUserTodo)
  .post(validateBody(todoSchema), createTodo)
  .patch(validateBody(todoUpdateSchema), updateTodo)
  .delete(deleteTodo);

todoRouter.route("/service/:id").get(todoService)


export default todoRouter;
