import expressAsyncHandler from "express-async-handler";
import { getTodo, todoSearchService } from "../../service/todo.service";


export const getAllUserTodo = expressAsyncHandler(async (req, res) => {
    const {id: userId} = req.params
    const allTodo = await getTodo(+userId)
    res.send({ success: true, detail: allTodo });
  });


  export const todoService = expressAsyncHandler(async (req, res) => {
    const {page, pageSize, searchQuery, filterCompleted, sortBy} = req.query
    const {id: userId} = req.params
    let completedFilter
    if(filterCompleted==="true") completedFilter = true
    else if (filterCompleted==="false") completedFilter = false
    else completedFilter = undefined
    const allTodo = await todoSearchService(+userId!, +page!, +pageSize!, searchQuery as string, completedFilter, sortBy==="title" ? "title" : "completed")
    res.send({ success: true, detail: allTodo });
  }); 