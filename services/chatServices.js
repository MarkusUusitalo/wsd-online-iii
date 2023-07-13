import { sql } from "../database/database.js";

const fiveMessages = async () => {
    const rows = await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 5`;
    return rows;
}

const create = async (sender, message) => {
    await sql`INSERT INTO messages (sender, message) VALUES (${sender}, ${message})`;
}

export {fiveMessages, create}