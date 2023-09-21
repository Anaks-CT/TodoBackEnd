import expressAsyncHandler from "express-async-handler";
import { newTodo } from "../../service/todo.service";
import { RequestWithUser } from "../../middleware/authMiddleware";

export const createTodo = expressAsyncHandler(async (req: RequestWithUser, res) => {
  const { title, completed } = req.body;
  const user = req.user
  const todo = await newTodo(+user.rows[0].id, title, completed);
  res.status(201).json({ success: true, detail: todo });
});


