const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/vocabulary', (req, res) => {
    const sql = `SELECT vocabulary.id AS vocabulary_id, books.id AS book_id, title, author, content, datetime FROM vocabulary JOIN books ON vocabulary.book_id = books.id WHERE user_id = $1;`;
    const sqlParams = [req.session.userId];

    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const vocabulary = result.rows;
        res.render('vocabulary', { vocabulary: vocabulary });
    })
})

router.post('/vocabulary', (req, res) => {
    const bookId = req.body.book_id;
    const userId = req.session.userId;
    const vocabContent = req.body.vocab_content;
    const datetime = req.nowFormatted();
    const sql = `INSERT INTO vocabulary (user_id, book_id, content, datetime) VALUES ($1, $2, $3, $4);`;
    const sqlParams = [userId, bookId, vocabContent, datetime];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect(`/books/${bookId}`);
    })
})

router.get('/vocabulary/:id/edit', (req, res) => {
    const vocabId = req.params.id;
    const userId = req.session.userId;
    const sql = `SELECT vocabulary.id AS vocabulary_id, content, datetime, books.title FROM vocabulary JOIN books ON vocabulary.book_id = books.id WHERE vocabulary.id = $1 AND user_id = $2;`;
    const sqlParams = [vocabId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const vocabulary = result.rows[0];
        res.render('notes_edit', { vocabulary: vocabulary });
    })
})

router.put('/vocabulary/:id', (req, res) => {
    const userId = req.session.userId;
    const vocabularyId = req.params.id;
    const vocabularyContent = req.body.vocabulary_content;
    const datetime = req.nowFormatted();
    const sql = `UPDATE vocabulary SET content = $1, datetime = $2 WHERE id = $3 AND user_id = $4 RETURNING book_id;`;
    const sqlParams = [vocabularyContent, datetime, vocabularyId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const bookId = result.rows[0].book_id;
        res.redirect(`/books/${bookId}`)
    })
})

router.delete('/vocabulary/:id', (req, res) => {
    const vocabularyId = req.params.id;
    const userId = req.session.userId;
    const sql = `DELETE FROM vocabulary WHERE id = $1 AND user_id = $2 RETURNING book_id;`;
    const sqlParams = [vocabularyId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const bookId = result.rows[0].book_id;
        res.redirect(`/books/${bookId}`)
    })
})

module.exports = router;