const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/books', (req, res) => {
    const sql = `SELECT * FROM books WHERE is_public ORDER BY title;`;
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        const booksPublic = result.rows;
        const sql = `SELECT * FROM books WHERE NOT is_public AND id IN (SELECT book_id FROM freetext_books_from_user WHERE user_id = $1) ORDER BY title;`;
        const sqlParams = [req.session.userId];
        db.query(sql, sqlParams, (err, result) => {
            if (err) console.log(err);
            const booksPrivate = result.rows;
            res.render('books', { booksPublic: booksPublic, booksPrivate: booksPrivate });
        })
    })
})

router.get('/books/new', (req, res) => {
    res.render('books_new');
})

router.get('/books/completed', (req, res) => {
    const sql = `SELECT book_id, books.title, books.author, books.publication_year, datetime_completed FROM books_in_user_library JOIN books ON books_in_user_library.book_id = books.id WHERE user_id = $1 AND datetime_completed IS NOT NULL ORDER BY datetime_completed;`;
    const sqlParams = [req.session.userId];

    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const completed_books = result.rows;
        res.render('completed_books', { completed_books: completed_books });
    })
})

router.post('/books', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const publicationYear = req.body.publication_year;
    const is_public = false;
    const urlTitle = title.split(" ").join('\\n');
    const imageUrl = `https://placehold.co/420x600?text=${urlTitle}`;
    
    const sql = `INSERT INTO books (title, author, publication_year, image_url, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
    const sqlParams = [title, author, publicationYear, imageUrl, is_public];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const newId = result.rows[0].id;
        const sql = `INSERT INTO freetext_books_from_user (book_id, user_id) VALUES ($1, $2) RETURNING *;`;
        const sqlParams = [newId, req.session.userId];
        db.query(sql, sqlParams, (err, result) => {
            if (err) console.log(err);
            res.redirect('/books');
        })
    })
})

router.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = `SELECT * FROM books WHERE id = $1;`;
    const sqlParams = [bookId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const book = result.rows[0];
        let isInLibrary = false;
        let isFreetextFromUser = false;
        const sql = `SELECT * FROM books_in_user_library WHERE book_id = $1 AND user_id = $2;`;
        const sqlParams = [bookId, req.session.userId];
        db.query(sql, sqlParams, (err, result) => {
            if (err) console.log(err);
            if (result.rows.length > 0) {
                isInLibrary = true;
            } 
            const bookInUserLibrary = result.rows[0];
            const sql = `SELECT * FROM freetext_books_from_user WHERE book_id = $1 and user_id = $2;`;
            const sqlParams = [bookId, req.session.userId];
            db.query(sql, sqlParams, (err, result) => {
                if (err) console.log(err);
                if (result.rows.length > 0) {
                    isFreetextFromUser = true;
                }
                let userReview = {};
                let allReviews = [];
                const sql = `SELECT reviews.id AS id, user_id AS writer_id, book_id, content, datetime, users.name AS writer_name, users.email AS writer_email FROM reviews JOIN users ON reviews.user_id = users.id WHERE book_id = $1 AND user_id = $2;`;
                const sqlParams = [bookId, req.session.userId];
                db.query(sql, sqlParams, (err, result) => {
                    if (err) console.log(err);
                    userReview = result.rows[0];
                    const sql = `SELECT reviews.id AS id, user_id AS writer_id, book_id, content, datetime, users.name AS writer_name, users.email AS writer_email FROM reviews JOIN users ON reviews.user_id = users.id WHERE book_id = $1;`;
                    const sqlParams = [bookId];
                    db.query(sql, sqlParams, (err, result) => {
                        if (err) console.log(err);
                        allReviews = result.rows;
                        let notes = [];
                        const sql = `SELECT id, content, datetime FROM notes WHERE book_id = $1 AND user_id = $2 ORDER BY datetime;`;
                        const sqlParams = [bookId, req.session.userId];
                        db.query(sql, sqlParams, (err, result) => {
                            if (err) console.log(err);
                            notes = result.rows;
                            res.render('books_show', { book: book, bookInUserLibrary: bookInUserLibrary, isInLibrary: isInLibrary, isFreetextFromUser: isFreetextFromUser, userReview: userReview, allReviews: allReviews, notes: notes });
                        })
                    })
                })
            })
        })
    })
})

router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM books WHERE id = $1;`;
    const sqlParams = [id];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect('/books');
    })
})

router.get('/books/:id/edit', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id = $1;`;
    const sqlParams = [id];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const book = result.rows[0];
        res.render('books_edit', { book: book });
    })
})

router.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const publicationYear = req.body.publication_year;
    const urlTitle = title.split(" ").join('\\n');
    const imageUrl = `https://placehold.co/420x600?text=${urlTitle}`;

    const sql = `UPDATE books SET title = $1, author = $2, publication_year = $3, image_url = $4 WHERE id = $5;`;
    const sqlParams = [title, author, publicationYear, imageUrl, bookId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect('/books');
    })
})

module.exports = router;