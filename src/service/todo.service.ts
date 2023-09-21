import ErrorResponse from "../error/errorResponse";
import {
  checkExistingTodo,
  createNewTodo,
  deleteTodo,
  getTodoByUser,
  getTodosWithOptions,
  totalTodos,
  updateTodo as updateTodoOperation,
} from "../helper/todoCRUD";
import { checkExistingUserWithUserId } from "../helper/userCRUD";

const invalidId = (user_id: number) => {
  if (!user_id)
    throw ErrorResponse.badRequest(
      "Please provide an Id for reference in params"
    );
};

export const newTodo = async (
  user_id: number,
  title: string,
  completed: boolean = false
) => {
  // throwing error if userid is not there
  invalidId(user_id);

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
  // throwing error if userid is not there
  invalidId(user_id);

  // Check if the user with the given user_id exists
  const userExistsResult = await checkExistingUserWithUserId(user_id);

  // throwing error if the user doesn't exist with the give user id
  if (userExistsResult.rowCount === 0)
    throw ErrorResponse.notFound("User not found");

  // Insert a new todo record associated with the user

  const todosResult = await getTodoByUser(user_id);
  const totaltodo = await totalTodos(user_id);

  return { todos: todosResult.rows, totaltodo };
};

export const todoUpdate = async (
  title: string,
  completed: boolean,
  todoId: number
) => {
  // throwing error if userid is not there
  invalidId(todoId);

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
  // throwing error if userid is not there
  invalidId(todoId);

  // Check if the todo with the given todoid exists
  const todoExistResult = await checkExistingTodo(todoId);

  // throwing error if the todo doesn't exist
  if (todoExistResult.rowCount === 0)
    throw ErrorResponse.notFound("Todo not found");

  // updating todo with the associated id
  const todosResult = await deleteTodo(todoId);

  return todosResult.rows; // Return the deleted  todo
};

export const todoSearchService = async (
  userId: number,
  page: number,
  pageSize: number,
  searchQuery: string,
  filterCompleted?: boolean,
  sortBy?: "title" | "completed"
) => {
  // throwing error if userid is not there
  invalidId(userId);
  if (page < 1)
    throw ErrorResponse.badRequest("Page number cannot be less than 1");
  if (pageSize < 1)
    throw ErrorResponse.badRequest("Page size cannot be less than 1");

  // Check if the user with the given user_id exists
  const userExistsResult = await checkExistingUserWithUserId(userId);

  // throwing error if the user doesn't exist with the give user id
  if (userExistsResult.rowCount === 0)
    throw ErrorResponse.notFound("User not found");

  // updating todo with the associated id
  const todosResult = await getTodosWithOptions(
    +userId!,
    +page!,
    +pageSize!,
    searchQuery as string,
    filterCompleted,
    sortBy === "title" ? "title" : "completed"
  );

  return todosResult; // Return all the details
};
