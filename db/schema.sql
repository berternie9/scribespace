CREATE DATABASE scribespace;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password_hash TEXT
);

INSERT INTO users (name, email, password_hash) VALUES ('test', 'test@test.com', '$2b$10$EwaBo.UdE6cIT/y5NfhVSeLPKLv4mhYhYR7aF0rednwrrFrQ1qwyG');

-- 

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publication_year TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_public BOOLEAN NOT NULL
);

INSERT INTO books (title, author, publication_year, image_url, is_public) VALUES
('Don Quixote', 'Miguel de Cervantes', '1605', 'https://placehold.co/420x600?text=Don\nQuixote', TRUE),
('A Tale of Two Cities', 'Charles Dickens', '1859', 'https://placehold.co/420x600?text=A\nTale\nof\nTwo\nCities', TRUE),
('The Lord of the Rings', 'J.R.R. Tolkien', '1954', 'https://placehold.co/420x600?text=The\nLord\nof\nthe\nRings', TRUE),
('The Little Prince', 'Antoine de Saint-Exupéry', '1943', 'https://placehold.co/420x600?text=The\nLittle\nPrince', TRUE),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '1997', 'https://placehold.co/420x600?text=Harry\nPotter\nand\nthe\nSorcerer''s\nStone', TRUE),
('And Then There Were None', 'Agatha Christie', '1939', 'https://placehold.co/420x600?text=And\nThen\nThere\nWere\nNone', TRUE),
('Alice''s Adventures in Wonderland', 'Lewis Carroll', '1865', 'https://placehold.co/420x600?text=Alice''s\nAdventures\nin\nWonderland', TRUE),
('The Hobbit', 'J.R.R. Tolkien', '1937', 'https://placehold.co/420x600?text=The\nHobbit', TRUE),
('Dream of the Red Chamber', 'Cao Xueqin', '1791', 'https://placehold.co/420x600?text=Dream\nof\nthe\nRed\nChamber', TRUE),
('The Lion, the Witch and the Wardrobe', 'C.S. Lewis', '1950', 'https://placehold.co/420x600?text=The\nLion,\nthe\nWitch\nand\nthe\nWardrobe', TRUE),
('The Da Vinci Code', 'Dan Brown', '2003', 'https://placehold.co/420x600?text=The\nDa\nVinci\nCode', TRUE),
('Pride and Prejudice', 'Jane Austen', '1813', 'https://placehold.co/420x600?text=Pride\nand\nPrejudice', TRUE),
('1984', 'George Orwell', '1949', 'https://placehold.co/420x600?text=1984', TRUE),
('The Catcher in the Rye', 'J.D. Salinger', '1951', 'https://placehold.co/420x600?text=The\nCatcher\nin\nthe\nRye', TRUE),
('The Alchemist', 'Paulo Coelho', '1988', 'https://placehold.co/420x600?text=The\nAlchemist', TRUE),
('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '1967', 'https://placehold.co/420x600?text=One\nHundred\nYears\nof\nSolitude', TRUE),
('Lolita', 'Vladimir Nabokov', '1955', 'https://placehold.co/420x600?text=Lolita', TRUE),
('The Great Gatsby', 'F. Scott Fitzgerald', '1925', 'https://placehold.co/420x600?text=The\nGreat\nGatsby', TRUE),
('Crime and Punishment', 'Fyodor Dostoevsky', '1866', 'https://placehold.co/420x600?text=Crime\nand\nPunishment', TRUE),
('Anna Karenina', 'Leo Tolstoy', '1877', 'https://placehold.co/420x600?text=Anna\nKarenina', TRUE);

INSERT INTO books (title, author, publication_year, image_url, is_public) VALUES
('Beloved', 'Toni Morrison', '1987', 'https://placehold.co/420x600?text=Beloved', FALSE),
('Invisible Man', 'Ralph Ellison', '1952', 'https://placehold.co/420x600?text=Invisible\nMan', FALSE),
('Middlemarch', 'George Eliot', '1871', 'https://placehold.co/420x600?text=Middlemarch', FALSE),
('The Brothers Karamazov', 'Fyodor Dostoevsky', '1880', 'https://placehold.co/420x600?text=The\nBrothers\nKaramazov', FALSE),
('Ulysses', 'James Joyce', '1922', 'https://placehold.co/420x600?text=Ulysses', FALSE);

-- 

CREATE TABLE books_in_user_library (
    book_id INTEGER NOT NULL REFERENCES books (id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    datetime_commenced TIMESTAMP NOT NULL,
    datetime_completed TIMESTAMP 
);

INSERT INTO books_in_user_library (book_id, user_id, datetime_commenced, datetime_completed) VALUES
(41, 2, '2024-04-22 14:00:00', '2024-04-24 16:30:00'),
(42, 2, '2024-04-22 09:45:00', '2024-04-25 11:20:00'),
(43, 2, '2024-04-23 08:00:00', '2024-04-26 13:45:00'),
(44, 2, '2024-04-24 10:30:00', '2024-04-27 15:15:00'),
(45, 2, '2024-04-25 12:00:00', '2024-04-28 17:00:00'),
(21, 2, '2024-04-22 13:20:00', '2024-04-24 14:50:00'),
(25, 2, '2024-04-23 15:30:00', '2024-04-26 09:25:00'),
(30, 2, '2024-04-24 16:00:00', '2024-04-27 18:10:00'),
(35, 2, '2024-04-25 11:15:00', '2024-04-28 19:45:00'),
(39, 2, '2024-04-26 08:45:00', '2024-04-29 12:00:00');

-- 

CREATE TABLE freetext_books_from_user (
    book_id INTEGER NOT NULL REFERENCES books (id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO freetext_books_from_user (book_id, user_id) VALUES
(41, 2),
(42, 2),
(43, 2),
(44, 2),
(45, 2);

-- 

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    book_id INTEGER NOT NULL REFERENCES books (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    book_id INTEGER NOT NULL REFERENCES books (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL
);
		
CREATE TABLE vocabulary (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    book_id INTEGER NOT NULL REFERENCES books (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    datetime TIMESTAMP NOT NULL
);