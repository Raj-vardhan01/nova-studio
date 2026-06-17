import pool from "../../../lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM projects"
    );

    return Response.json(result.rows);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const {
      title,
      category,
      image_url
    } = await request.json();

    const result = await pool.query(
      `INSERT INTO projects
      (title, category, image_url)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, category, image_url]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await pool.query(
      "DELETE FROM projects WHERE id = $1",
      [id]
    );

    return Response.json({
      message: "Project deleted",
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
