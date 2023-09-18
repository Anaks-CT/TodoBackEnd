import { Client, Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    host: "localhost", 
    database: "postgres",
    password: "postgres",
    port: 5432, // Make sure to convert PORT to a number
  });  
 
const dbConnection = (async () => {
  const client = await pool.connect(); 
  try { 
    const response = await pool.query('SELECT current_user');
    const { rows } = response;
    const currentUser = rows[0]['current_user'];
    console.log(currentUser); // postgres  
  } catch (err) {  
    console.error(err); 
  } finally { 
    client.release(); // Release the client back to the pool when done
  } 
})

export default dbConnection