const { pool } = require("../db");

async function create({ sender, conversation, type, text }) {
    const { rows } = await pool.query(
        `INSERT INTO message (conversation_id, user_id, type, text)
        VALUES ($1, $2, $3, $4)
        RETURNING id, conversation_id, user_id, type, text`,
        [conversation.id, sender.id, type, text]
    );

    await pool.query(
        `UPDATE conversation
        SET last_message = $1, updated_at = NOW()
        WHERE id = $2`,
        [text, conversation.id]
    );

    return rows[0];
}

async function fromConversation(conversation) {
    const { rows } = await pool.query(
        `SELECT m.id, m.conversation_id, m.user_id, m.type, m.text
        FROM message m
        WHERE m.conversation_id = $1
        ORDER BY m.created_at, m.id`,
        [conversation.id]
    );

    return rows;
}

module.exports = { create, fromConversation }