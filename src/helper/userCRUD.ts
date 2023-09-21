import { pool } from "../config/database";

export const checkExistingUser = async (email: string) =>
  await pool.query("SELECT * FROM users WHERE email = $1", [email]);

export const checkExistingUserWithUserId = async (userID: number) =>
  await pool.query("SELECT * FROM users WHERE id = $1", [userID]);

export const createNewUser = async (email: string) =>
  await pool.query("INSERT INTO users (email) VALUES ($1)", [email]);
