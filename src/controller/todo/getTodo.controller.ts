import expressAsyncHandler from "express-async-handler";
import { getTodo } from "../../service/todo.service";


export const getAllUserTodo = expressAsyncHandler(async (req, res) => {
    const {id: userId} = req.params
    const allTodo = await getTodo(+userId)
    res.status(200).json({ success: true, detail: allTodo });
  });