import { pool } from "../config/database";

export const createNewTodo = async (
  title: string,
  user_id: number,
  completed: boolean
) => {
  return await pool.query(
    `
    INSERT INTO todos (title, user_id, completed)
    VALUES ($1, $2, $3)
    RETURNING id, title, completed;
  `,
    [title, user_id, completed]
  );
}

export const getTodoByUser = async (userId: number, page: number = 1, pageSize: number = 5) => {
  // Calculate the offset based on the page number and page size
  const offset = (page - 1) * pageSize;

  const queryString = `
    SELECT id, title, completed
    FROM todos
    WHERE user_id = $1
    ORDER BY id
    LIMIT $2
    OFFSET $3;
  `; 

  const queryParams = [userId, pageSize, offset];

  return await pool.query(queryString, queryParams);
}

export const totalTodos = async(userId: number) => {
  const totalCountQuery = `
    SELECT COUNT(*) as total_count
    FROM todos
    WHERE user_id = $1;
  `;

  const totalCountResult = await pool.query(totalCountQuery, [userId]);
  return totalCountResult.rows[0].total_count;
}

export const checkExistingTodo = async (todoId: number) => {
  return await pool.query("SELECT * FROM todos WHERE id = $1", [todoId]);
}

export const deleteTodo = async (todoId: number) => {
  return await pool.query(
    `
  DELETE FROM todos
  WHERE id = $1
  RETURNING id;
`,
    [todoId]
  );
}

export const updateTodo = async(
  title: string | undefined,
  completed: boolean | undefined,
  todoId: number
) => {
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

export const getTodosWithOptions = async (userId: number, page: number = 1, pageSize: number = 5, searchQuery?: string, filterCompleted?: boolean, sortBy?: 'title' | 'completed') => {
  // Calculate the offset based on the page number and page size
  const offset = (page - 1) * pageSize;

  let queryString = `
    SELECT id, title, completed
    FROM todos
    WHERE user_id = $1
  `;

  const queryParams: any[] = [userId];

  // Apply search filter if a search query is provided
  if (searchQuery) {
    queryString += `
      AND (title ILIKE $${queryParams.length + 1})
    `;
    queryParams.push(`%${searchQuery}%`);
  }

  // Apply filter based on completed status if provided
  if (filterCompleted !== undefined) {
    queryString += `
      AND completed = $${queryParams.length + 1}
    `;
    queryParams.push(filterCompleted);
  }

  // Apply sorting if sortBy is provided
  if (sortBy) {
    queryString += `
      ORDER BY ${sortBy === 'title' ? 'title' : 'completed'}
    `;
  }

  // Retrieve the count of filtered todos for pagination purposes
  let filteredCountQuery = `
    SELECT COUNT(*) as total_count
    FROM todos
    WHERE user_id = $1
  `;

  // Add filters to the count query
  if (searchQuery) {
    filteredCountQuery += `
      AND (title ILIKE $2)
    `;
  }

  if (filterCompleted !== undefined) {
    filteredCountQuery += `
      AND completed = $${searchQuery ? '3' : '2'}
    `;
  }

  const filteredCountParams = [userId, ...(searchQuery ? [`%${searchQuery}%`] : []), ...(filterCompleted !== undefined ? [filterCompleted] : [])];
  
  const filteredCountResult = await pool.query(filteredCountQuery, filteredCountParams);
  
  const filteredCount = filteredCountResult.rows[0].total_count;

  // Apply pagination based on the filtered count
  queryString += `
    LIMIT $${queryParams.length + 1}
    OFFSET $${queryParams.length + 2};
  `;

  queryParams.push(pageSize, offset);

  const result = await pool.query(queryString, queryParams);

  return {
    todos: result.rows,
    currentPage: page,
    totalPages: Math.ceil(filteredCount / pageSize),
  };
}





 