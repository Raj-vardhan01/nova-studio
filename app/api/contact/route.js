import pool from "../../../lib/db";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const result = await pool.query(
      `INSERT INTO contacts (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
