CREATE DATABASE scribespace;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password_hash TEXT
);

INSERT INTO users (name, email, password_hash) VALUES ('test', 'test@test.com', 'test');