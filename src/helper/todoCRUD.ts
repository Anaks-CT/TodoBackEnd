import { pool } from "../config/database";



async function createNewTodo(title: string, user_id: string, completed: boolean) {
    return await pool.query(`
    INSERT INTO todos (title, user_id, completed)
    VALUES ($1, $2, $3)
    RETURNING id, title, completed;
  `, [title, user_id, completed]);
  }

  export { createNewTodo }