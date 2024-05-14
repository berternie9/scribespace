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
    isPublic BOOLEAN NOT NULL
);

INSERT INTO books (title, author, publication_year, image_url, isPublic) VALUES
('Don Quixote', 'Miguel de Cervantes', '1605', 'https://fakeimg.pl/420x600?text=Don+Quixote', TRUE),
('A Tale of Two Cities', 'Charles Dickens', '1859', 'https://fakeimg.pl/420x600?text=A+Tale+of+Two+Cities', TRUE),
('The Lord of the Rings', 'J.R.R. Tolkien', '1954', 'https://fakeimg.pl/420x600?text=The+Lord+of+the+Rings', TRUE),
('The Little Prince', 'Antoine de Saint-Exupéry', '1943', 'https://fakeimg.pl/420x600?text=The+Little+Prince', TRUE),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', '1997', 'https://fakeimg.pl/420x600?text=Harry+Potter', TRUE),
('And Then There Were None', 'Agatha Christie', '1939', 'https://fakeimg.pl/420x600?text=And+Then+There+Were+None', TRUE),
('Alice''s Adventures in Wonderland', 'Lewis Carroll', '1865', 'https://fakeimg.pl/420x600?text=Alice+in+Wonderland', TRUE),
('The Hobbit', 'J.R.R. Tolkien', '1937', 'https://fakeimg.pl/420x600?text=The+Hobbit', TRUE),
('Dream of the Red Chamber', 'Cao Xueqin', '1791', 'https://fakeimg.pl/420x600?text=Dream+of+the+Red+Chamber', TRUE),
('The Lion, the Witch and the Wardrobe', 'C.S. Lewis', '1950', 'https://fakeimg.pl/420x600?text=Narnia', TRUE),
('The Da Vinci Code', 'Dan Brown', '2003', 'https://fakeimg.pl/420x600?text=The+Da+Vinci+Code', TRUE),
('Pride and Prejudice', 'Jane Austen', '1813', 'https://fakeimg.pl/420x600?text=Pride+and+Prejudice', TRUE),
('1984', 'George Orwell', '1949', 'https://fakeimg.pl/420x600?text=1984', TRUE),
('The Catcher in the Rye', 'J.D. Salinger', '1951', 'https://fakeimg.pl/420x600?text=The+Catcher+in+the+Rye', TRUE),
('The Alchemist', 'Paulo Coelho', '1988', 'https://fakeimg.pl/420x600?text=The+Alchemist', TRUE),
('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '1967', 'https://fakeimg.pl/420x600?text=One+Hundred+Years+of+Solitude', TRUE),
('Lolita', 'Vladimir Nabokov', '1955', 'https://fakeimg.pl/420x600?text=Lolita', TRUE),
('The Great Gatsby', 'F. Scott Fitzgerald', '1925', 'https://fakeimg.pl/420x600?text=The+Great+Gatsby', TRUE),
('Crime and Punishment', 'Fyodor Dostoevsky', '1866', 'https://fakeimg.pl/420x600?text=Crime+and+Punishment', TRUE),
('Anna Karenina', 'Leo Tolstoy', '1877', 'https://fakeimg.pl/420x600?text=Anna+Karenina', TRUE);


-- 

CREATE TABLE books_in_user_library (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    datetime_commenced TIMESTAMP NOT NULL,
    datetime_completed TIMESTAMP NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    book_id INTEGER NOT NULL REFERENCES books (id),
    datetime TIMESTAMP NOT NULL
)

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    book_id INTEGER NOT NULL REFERENCES books (id),
    datetime TIMESTAMP NOT NULL
)
		
