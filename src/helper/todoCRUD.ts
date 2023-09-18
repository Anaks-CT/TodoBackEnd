import { pool } from "../config/database";

async function createNewTodo(
  title: string,
  user_id: number,
  completed: boolean
) {
  return await pool.query(
    `
    INSERT INTO todos (title, user_id, completed)
    VALUES ($1, $2, $3)
    RETURNING id, title, completed;
  `,
    [title, user_id, completed]
  );
}

async function getTodoByUser(userId: number) {
  return await pool.query(
    `
  SELECT id, title, completed
  FROM todos
  WHERE user_id = $1;
`,
    [userId]
  );
}

async function checkExistingTodo(todoId: number) {
  return await pool.query("SELECT * FROM todos WHERE id = $1", [todoId]);
}

async function deleteTodo(todoId: number) {
  return await pool.query(
    `
  DELETE FROM todos
  WHERE id = $1
  RETURNING id;
`,
    [todoId]
  );
}

async function updateTodo(
  title: string | undefined,
  completed: boolean | undefined,
  todoId: number
) {
  let queryString = "";
  const queryParams = [];

  if (title !== undefined && completed !== undefined) {
    queryString = `
      UPDATE todos
      SET title = $1, completed = $2
      WHERE id = $3
      RETURNING id, title, completed;
    `;
    queryParams.push(title, completed, todoId);
  } else if (title !== undefined) {
    queryString = `
      UPDATE todos
      SET title = $1
      WHERE id = $2
      RETURNING id, title, completed;
    `;
    queryParams.push(title, todoId);
  } else if (completed !== undefined) {
    queryString = `
      UPDATE todos
      SET completed = $1
      WHERE id = $2
      RETURNING id, title, completed;
    `;
    queryParams.push(completed, todoId);
  }

  return await pool.query(queryString, queryParams);
}

export { createNewTodo, getTodoByUser, updateTodo, checkExistingTodo, deleteTodo };
 