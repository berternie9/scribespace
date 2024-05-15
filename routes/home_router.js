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

module.exports = router;