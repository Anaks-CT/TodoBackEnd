import expressAsyncHandler from "express-async-handler";
import { todoUpdate } from "../../service/todo.service";

export const updateTodo = expressAsyncHandler(async (req, res) => {
  const { title, completed } = req.body;
  const { id: todoId } = req.params;
  const todo = await todoUpdate(title, completed, +todoId);
  res.send({ success: true, detail: todo });
});


