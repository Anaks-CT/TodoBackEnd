import ErrorResponse from "../error/errorResponse";
import { checkExistingTodo, createNewTodo, deleteTodo, getTodoByUser, updateTodo as updateTodoOperation } from "../helper/todoCRUD";
import {
  checkExistingUserWithUserId,
} from "../helper/userCRUD";

export const newTodo = async (
  user_id: number,
  title: string,
  completed: boolean = false
) => {

  // Check if the user with the given user_id exists
  const userExistsResult = await checkExistingUserWithUserId(user_id);

  // throwing error if the user doesn't exist with the give user id
  if (userExistsResult.rowCount === 0)
    throw ErrorResponse.notFound("User not found");

  // Insert a new todo record associated with the user

  const insertedTodo = await createNewTodo(title, user_id, completed);

  if (!insertedTodo.rows[0])
    throw ErrorResponse.internalError("Todo not created");

  return insertedTodo.rows[0]; // Return the newly created todo
};

export const getTodo = async (user_id: number) => {
  // Check if the user with the given user_id exists
  const userExistsResult = await checkExistingUserWithUserId(user_id);

  // throwing error if the user doesn't exist with the give user id
  if (userExistsResult.rowCount === 0)
    throw ErrorResponse.notFound("User not found");

  // Insert a new todo record associated with the user

  const todosResult = await getTodoByUser(user_id);

  return todosResult.rows; // Return the newly created todo
};


export const todoUpdate = async (title: string, completed: boolean, todoId: number) => {

  // Check if the todo with the given todoid exists
  const todoExistResult = await checkExistingTodo(todoId);

  // throwing error if the todo doesn't exist 
  if (todoExistResult.rowCount === 0)
    throw ErrorResponse.notFound("Todo not found");

  // updating todo with the associated id
  const todosResult = await updateTodoOperation(title, completed, todoId);

  return todosResult.rows; // Return the newly created todo
};

export const todoDelete = async (todoId: number) => {

  // Check if the todo with the given todoid exists
  const todoExistResult = await checkExistingTodo(todoId);

  // throwing error if the todo doesn't exist 
  if (todoExistResult.rowCount === 0)
    throw ErrorResponse.notFound("Todo not found");

  // updating todo with the associated id
  const todosResult = await deleteTodo(todoId);

  return todosResult.rows; // Return the newly created todo
};

