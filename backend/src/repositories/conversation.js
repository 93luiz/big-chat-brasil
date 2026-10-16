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

async function find(id, user) {
    if (!user || !user.id) {
        return null;
    } 
    const { rows } = await pool.query(
        `SELECT c.id, c.last_message, c.created_at
        FROM conversation c
        INNER JOIN conversation_user u ON c.id = u.conversation_id
        WHERE c.id = $1 AND u.id = $2`,
        [id, user.id]
    );
    return rows[0];
}

async function all(user) {
    if (!user || !user.id) {
        return [];
    }

    const { rows } = await pool.query(
        `SELECT c.id, c.last_message, c.created_at, r.name AS title
        FROM conversation c
        INNER JOIN conversation_user u ON c.id = u.conversation_id
        INNER JOIN users r ON r.id = u.reciever_user_id
        WHERE u.user_id = $1`,
        [user.id]
    );
    return rows;
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

        await client.query(
            `INSERT INTO message (conversation_id, user_id, type, text)
            VALUES ($1, $2, $3, $4)`,
            [conversation.id, sender.id, 'system', 'Conversa criada']
        );

        senderConversation.conversation = conversation;
        return senderConversation;
    });

    return conversation;
}

module.exports = { getConversation, find, all };