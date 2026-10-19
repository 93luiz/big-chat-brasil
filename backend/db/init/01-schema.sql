CREATE TYPE doc_type AS ENUM ('cpf', 'cnpj');

CREATE TYPE message_type AS ENUM ('system', 'text');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    document TEXT NOT NULL,
    document_type doc_type NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (document, document_type)
);

CREATE TABLE conversation (
    id SERIAL PRIMARY KEY,
    last_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversation_user (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversation(id) NOT NULL,
    user_id INTEGER NOT NULL,
    reciever_user_id INTEGER NOT NULL,

    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_reciever_user_id
        FOREIGN KEY (reciever_user_id)
        REFERENCES users(id)

);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    type message_type NOT NULL,
    text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_conversation_id
        FOREIGN KEY (conversation_id)
        REFERENCES conversation(id),

    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);