import { pool } from "../config/database";

async function checkExistingUser(username: string) {
  return await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
}

async function checkExistingUserWithUserId(userID: number) {
  return await pool.query("SELECT * FROM users WHERE id = $1", [userID]);
}

async function createNewUser(username: string) {
  return await pool.query("INSERT INTO users (username) VALUES ($1)", [
    username,
  ]);
}

export { checkExistingUser, createNewUser, checkExistingUserWithUserId };
