DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS reset_code;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profileurl VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reset_code (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    code VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- //ALTER TABLE mytable ALTER COLUMN created_at SET DEFAULT now();
CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    recipient_id INTEGER NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    text VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
)