import expressAsyncHandler from "express-async-handler";
import { newTodo } from "../../service/todo.service";

export const createTodo = expressAsyncHandler(async (req, res) => {
  const { title, completed } = req.body;
  const { id: userId } = req.params;
  const todo = await newTodo(+userId, title, completed);
  res.status(201).json({ success: true, detail: todo });
});


