import expressAsyncHandler from "express-async-handler";
import { todoDelete } from "../../service/todo.service";

export const deleteTodo = expressAsyncHandler(async (req, res) => {
    const { id: todoId } = req.params;
    const todo = await todoDelete(+todoId);
    res.send({ success: true, detail: todo });
  });