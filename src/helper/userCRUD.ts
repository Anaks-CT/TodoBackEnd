import { pool } from "../config/database";

export const checkExistingUser = async (username: string) =>
  await pool.query("SELECT * FROM users WHERE username = $1", [username]);

export const checkExistingUserWithUserId = async (userID: number) =>
  await pool.query("SELECT * FROM users WHERE id = $1", [userID]);

export const createNewUser = async (username: string) =>
  await pool.query("INSERT INTO users (username) VALUES ($1)", [username]);
