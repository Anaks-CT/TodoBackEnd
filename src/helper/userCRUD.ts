import { pool } from "../config/database";


async function checkExistingUser(username: string) {
    return await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
}

async function createNewUser(username: string){
    return await pool.query("INSERT INTO users (username) VALUES ($1)", [username]);
}





export { checkExistingUser, createNewUser, };
