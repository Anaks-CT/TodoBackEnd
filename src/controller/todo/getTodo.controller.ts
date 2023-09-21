import expressAsyncHandler from "express-async-handler";
import { getTodo, todoSearchService } from "../../service/todo.service";
import { RequestWithUser } from "../../middleware/authMiddleware";


export const getAllUserTodo = expressAsyncHandler(async (req: RequestWithUser, res) => {
    const user = req.user
    const allTodo = await getTodo(user.rows[0].id)
    res.send({ success: true, detail: allTodo });
  });


  export const todoService = expressAsyncHandler(async (req: RequestWithUser, res) => {
    const {page, pageSize, searchQuery, filterCompleted, sortBy} = req.query
    const user = req.user
    let completedFilter
    if(filterCompleted==="true") completedFilter = true
    else if (filterCompleted==="false") completedFilter = false
    else completedFilter = undefined
    const allTodo = await todoSearchService(+user.rows[0].id!, +page!, +pageSize!, searchQuery as string, completedFilter, sortBy==="title" ? "title" : "completed")
    res.send({ success: true, detail: allTodo });
  }); 