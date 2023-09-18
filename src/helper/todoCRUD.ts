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

export { createNewTodo, getTodoByUser };
