import expressAsyncHandler from "express-async-handler";
import { newTodo } from "../../service/todo.service";

export const createTodo = expressAsyncHandler(async (req, res) => {
  const { userId, title, completed } = req.body;
  const todo = await newTodo(userId, title, completed);
  res.status(201).json({ success: true, detail: todo });
});

