import { Client, Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432, // Make sure to convert PORT to a number
});

const dbConnection = async () => {
  const client = await pool.connect();
  try {
    const response = await pool.query("SELECT current_user");
    const { rows } = response;
    const currentUser = rows[0]["current_user"];
    console.log(currentUser); // postgres

    // Create the user table if it doesn't exist
    await createUserTableIfNotExists();

    // Create the todos table if it doesn't exist
    await createTodosTableIfNotExists();
  } catch (err) {
    console.error(err);
  } finally {
    client.release(); // Release the client back to the pool when done
  }
};

async function doesTableExist(tableName: string) {
  try {
    const result = await pool.query(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)",
      [tableName]
    );

    return result.rows[0].exists;
  } catch (error) {
    console.error("Error checking table existence:", error);
    return false; // Return false in case of an error
  }
}

async function createUserTableIfNotExists() {
  const tableName = "users"; // The name of your user table

  try {
    // Check if the table already exists
    const tableExists = await doesTableExist(tableName);

    if (!tableExists) {
      // Create the table if it doesn't exist
      await pool.query(`
          CREATE TABLE ${tableName} (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL
          )
        `);
    }
  } catch (error) {
    console.error("Error creating user table:", error);
  }
}

async function createTodosTableIfNotExists() {
  const tableName = "todos";

  try {
    const tableExists = await doesTableExist(tableName);

    if (!tableExists) {
      await pool.query(`
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          user_id INT REFERENCES users(id),
          completed BOOLEAN DEFAULT false
        )
      `);
    }
  } catch (error) {
    console.error("Error creating todos table:", error);
  }
}

export default dbConnection;
