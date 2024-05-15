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
    // 
    res.render('reviews_edit');
})

router.delete('/reviews/:id', (req, res) => {
    //
    res.render(`/books/${bookId}`);
})

// router.post('/comments', (req, res) => {
//     const content = req.body.content;
//     const dishId = req.body.dish_id;
//     const userId = req.session.userId;

//     const sql = `INSERT INTO comments (content, dish_id, user_id) VALUES ($1, $2, $3);`;

//     db.query(sql, [content, dishId, userId], (err, result) => {
//         if (err) console.log(err);
//         res.redirect(`/dishes/${dishId}`);
//     });
// });

// router.post('/books', (req, res) => {
//     const title = req.body.title;
//     const author = req.body.author;
//     const publicationYear = req.body.publication_year;
//     const is_public = false;
//     const urlTitle = title.split(" ").join('\\n');
//     const imageUrl = `https://placehold.co/420x600?text=${urlTitle}`;
    
//     const sql = `INSERT INTO books (title, author, publication_year, image_url, is_public) VALUES ($1, $2, $3, $4, $5) RETURNING id;`;
//     const sqlParams = [title, author, publicationYear, imageUrl, is_public];
//     db.query(sql, sqlParams, (err, result) => {
//         if (err) console.log(err);
//         const newId = result.rows[0].id;
//         const sql = `INSERT INTO freetext_books_from_user (book_id, user_id) VALUES ($1, $2) RETURNING *;`;
//         const sqlParams = [newId, req.session.userId];
//         db.query(sql, sqlParams, (err, result) => {
//             if (err) console.log(err);
//             res.redirect('/books');
//         })
//     })
// })

// router.get('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const sql1 = `SELECT * FROM books WHERE id = $1;`;
//     const sqlParams = [bookId];
//     db.query(sql1, sqlParams, (err, result) => {
//         if (err) console.log(err);
//         const book = result.rows[0];
//         let isInLibrary = false;
//         let isFreetextFromUser = false;
//         const sql = `SELECT * FROM books_in_user_library WHERE book_id = $1 AND user_id = $2;`;
//         const sqlParams = [bookId, req.session.userId];
//         db.query(sql, sqlParams, (err, result) => {
//             if (err) console.log(err);
//             if (result.rows.length > 0) {
//                 isInLibrary = true;
//             } 
//             const sql = `SELECT * FROM freetext_books_from_user WHERE book_id = $1 and user_id = $2;`;
//             const sqlParams = [bookId, req.session.userId];
//             db.query(sql, sqlParams, (err, result) => {
//                 if (err) console.log(err);
//                 if (result.rows.length > 0) {
//                     isFreetextFromUser = true;
//                 }
//                 res.render('books_show', { book: book, isInLibrary: isInLibrary, isFreetextFromUser: isFreetextFromUser, userReview: {}} );
//             })
//         })
//     })
// })

// router.delete('/books/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `DELETE FROM books WHERE id = $1;`;
//     const sqlParams = [id];
//     db.query(sql, sqlParams, (err, result) => {
//         if (err) console.log(err);
//         res.redirect('/books');
//     })
// })

// router.get('/books/:id/edit', (req, res) => {
//     const id = req.params.id;
//     const sql = `SELECT * FROM books WHERE id = $1;`;
//     const sqlParams = [id];
//     db.query(sql, sqlParams, (err, result) => {
//         if (err) console.log(err);
//         const book = result.rows[0];
//         res.render('books_edit', { book: book });
//     })
// })

// router.put('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const title = req.body.title;
//     const author = req.body.author;
//     const publicationYear = req.body.publication_year;
//     const urlTitle = title.split(" ").join('\\n');
//     const imageUrl = `https://placehold.co/420x600?text=${urlTitle}`;

//     const sql = `UPDATE books SET title = $1, author = $2, publication_year = $3, image_url = $4 WHERE id = $5;`;
//     const sqlParams = [title, author, publicationYear, imageUrl, bookId];
//     db.query(sql, sqlParams, (err, result) => {
//         if (err) console.log(err);
//         res.redirect('/books');
//     })
// })

module.exports = router;