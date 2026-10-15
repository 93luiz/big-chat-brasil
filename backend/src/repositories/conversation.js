const { pool, withTransaction } = require("../db");

async function getConversation(sender, reciever) {
    var { rows } = await pool.query(
        `SELECT id, conversation_id, user_id, reciever_user_id
        FROM conversation_user
        WHERE user_id = $1 AND reciever_user_id = $2`,
        [sender.id, reciever.id]
    );

    if (rows[0]) {
        const conversation_user = rows[0];
        const conversation = await find(conversation_user.conversation_id);
        conversation_user.conversation = conversation;
        return conversation_user;
    }

    return create(sender, reciever);
}

async function find(id) {
    const { rows } = await pool.query(
        `SELECT id, last_message, created_at
        FROM conversation
        WHERE id = $1`,
        [id]
    );
    return rows[0];
}

async function create(sender, reciever) {
    const conversation = await withTransaction(async (client) => {
        var { rows } = await client.query(
            `INSERT INTO conversation (last_message)
            VALUES (NULL)
            RETURNING id, last_message, created_at`
        );
        const conversation = rows[0];

        var { rows } = await client.query(
            `INSERT INTO conversation_user (conversation_id, user_id, reciever_user_id)
            VALUES ($1, $2, $3)
            RETURNING id, conversation_id, user_id, reciever_user_id`,
            [conversation.id, sender.id, reciever.id]
        );
        const senderConversation = rows[0];

        var { rows } = await client.query(
            `INSERT INTO conversation_user (conversation_id, user_id, reciever_user_id)
            VALUES ($1, $2, $3)
            RETURNING id, conversation_id, user_id, reciever_user_id`,
            [conversation.id, reciever.id, sender.id]
        );
        const recieverConversation = rows[0];

        senderConversation.conversation = conversation;
        return senderConversation;
    });

    return conversation;
}

module.exports = { getConversation, find };