const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/notes', (req, res) => {
    const bookId = req.body.book_id;
    const userId = req.session.userId;
    const noteContent = req.body.note_content;
    const datetime = req.nowFormatted();
    const sql = `INSERT INTO notes (user_id, book_id, content, datetime) VALUES ($1, $2, $3, $4);`;
    const sqlParams = [userId, bookId, noteContent, datetime];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        res.redirect(`/books/${bookId}`);
    })
})


router.get('/notes/:id/edit', (req, res) => {
    const noteId = req.params.id;
    const userId = req.session.userId;
    const sql = `SELECT notes.id AS note_id, content, datetime, books.title FROM notes JOIN books ON notes.book_id = books.id WHERE notes.id = $1 AND user_id = $2;`;
    const sqlParams = [noteId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const note = result.rows[0];
        res.render('notes_edit', { note: note });
    })
})

router.put('/notes/:id', (req, res) => {
    const userId = req.session.userId;
    const noteId = req.params.id;
    const noteContent = req.body.note_content;
    const datetime = req.nowFormatted();
    const sql = `UPDATE notes SET content = $1, datetime = $2 WHERE id = $3 AND user_id = $4 RETURNING book_id;`;
    const sqlParams = [noteContent, datetime, noteId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const bookId = result.rows[0].book_id;
        res.redirect(`/books/${bookId}`)
    })
})

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const userId = req.session.userId;
    const sql = `DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING book_id;`;
    const sqlParams = [noteId, userId];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        const bookId = result.rows[0].book_id;
        res.redirect(`/books/${bookId}`)
    })
})

module.exports = router;