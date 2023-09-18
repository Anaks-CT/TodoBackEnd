import ErrorResponse from "../error/errorResponse";
import { createNewTodo } from "../helper/todoCRUD";
import {
  checkExistingUser,
  checkExistingUserWithUserId,
} from "../helper/userCRUD";

export const newTodo = async (
  user_id: number,
  title: string,
  completed: boolean = false
) => {
  // Check if the user with the given user_id exists
  const userExistsResult = await checkExistingUserWithUserId(
    user_id.toString()
  );

  // throwing error if the user doesn't exist with the give user id
  if (userExistsResult.rowCount === 0)
    throw ErrorResponse.notFound("User not found");

  // Insert a new todo record associated with the user

  const insertedTodo = await createNewTodo(
    title,
    user_id.toString(),
    completed
  );

  if(!insertedTodo.rows[0]) throw ErrorResponse.internalError("Todo not created")

  return insertedTodo.rows[0]; // Return the newly created todo
};
