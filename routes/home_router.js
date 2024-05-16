const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const sql = `SELECT * FROM books WHERE id IN (SELECT book_id FROM books_in_user_library WHERE user_id = $1) ORDER BY title;`;
    const sqlParams = [req.session.userId];

    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const booksUser = result.rows;
        res.render('home', { booksUser: booksUser });
    })
});

router.post('/bookshelf/:id', (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.userId;
    const datetime = req.nowFormatted();
    const sql = `INSERT INTO books_in_user_library (book_id, user_id, datetime_commenced) VALUES ($1, $2, $3);`;
    const sqlParams = [bookId, userId, datetime];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect('/');
    })
})

router.put('/bookshelf/:id', (req, res) => {
    const bookId = req.params.id;
    const userId = req.session.userId;
    const datetime = req.nowFormatted();

    const sql = `UPDATE books_in_user_library SET datetime_completed = $1 WHERE book_id = $2 AND user_id = $3;`;
    const sqlParams = [datetime, bookId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect('/books/completed');
    })
})

module.exports = router;