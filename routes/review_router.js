const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/reviews', (req, res) => {
    const sql = `SELECT reviews.id AS review_id, books.id AS book_id, title, author, publication_year, image_url, content, datetime FROM reviews JOIN books ON reviews.book_id = books.id WHERE user_id = $1;`;
    const sqlParams = [req.session.userId];

    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const userReviews = result.rows;
        res.render('reviews', { userReviews: userReviews });
    })
})

router.post('/reviews', (req, res) => {
    const bookId = req.body.book_id;
    const userId = req.session.userId;
    const reviewContent = req.body.review_content;
    const datetime = req.nowFormatted();
    const sql = `INSERT INTO reviews (user_id, book_id, content, datetime) VALUES ($1, $2, $3, $4);`;
    const sqlParams = [userId, bookId, reviewContent, datetime];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect(`/books/${bookId}`);
    })
})

router.get('/reviews/:id/edit', (req, res) => {
    const reviewId = req.params.id;
    const userId = req.session.userId;
    const sql = `SELECT reviews.id AS review_id, content, datetime, books.title FROM reviews JOIN books ON reviews.book_id = books.id WHERE reviews.id = $1 AND user_id = $2;`;
    const sqlParams = [reviewId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const review = result.rows[0];
        res.render('reviews_edit', { review: review });
    })
})

router.put('/reviews/:id', (req, res) => {
    const userId = req.session.userId;
    const reviewId = req.params.id;
    const reviewContent = req.body.review_content;
    const datetime = req.nowFormatted();
    const sql = `UPDATE reviews SET content = $1, datetime = $2 WHERE id = $3 AND user_id = $4 RETURNING book_id;`;
    const sqlParams = [reviewContent, datetime, reviewId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const bookId = result.rows[0].book_id;
        res.redirect(`/books/${bookId}`)
    })
})


router.delete('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    const bookId = req.params.book_id;
    const userId = req.session.userId;
    const sql = `DELETE FROM reviews WHERE id = $1 AND user_id = $2;`;
    const sqlParams = [reviewId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect(`/books/${bookId}`)
    })
})

module.exports = router;