const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const plaintextPassword = req.body.password;
    const sql = `SELECT * FROM users WHERE email = $1;`;
    const sqlParams = [email];
    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        if (result.rows.length === 0) {
            return res.render('login',  { errorMessage: "Username or password not found" });
        }

        const hashedPasssword = result.rows[0].password_hash;
        bcrypt.compare(plaintextPassword, hashedPasssword, (err, isCorrect) => {
            if (err) console.log(err);
            if (!isCorrect) {
                return res.render('login',  { errorMessage: "Username or password not found" });
            }          
            req.session.userId = result.rows[0].id;
            res.redirect('/bookshelf');
        });
    });
})

router.delete('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const plaintextPassword = req.body.password;
    const confirmPlaintextPassword = req.body.confirm_password;

    if (plaintextPassword !== confirmPlaintextPassword) {
        console.log('passwords do not match');
        return res.render('register',  { errorMessage: "Passwords do not match." });
    }
    let sql = `SELECT * FROM users WHERE email = $1;`;
    let sqlParams = [email];

    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        if (result.rows.length > 0) {
            console.log('email already in database');
            return res.render('register',  { errorMessage: "Email already taken." });
        }
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(plaintextPassword, salt, (err, hash) => {
                sql = `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3);`;
                sqlParams = [username, email, hash];
                db.query(sql, sqlParams, (err, result) => {
                    if (err) console.log(err);
                    res.render('login');
                })
            })
        })
    })
})

router.get('/change_password', (req, res) => {
    res.render('change_password');
})

router.put('/change_password', (req, res) => {
    const userId = req.session.userId;
    const newPlaintextPassword = req.body.new_password;
    const confirmPlaintextPassword = req.body.confirm_password;
    if (newPlaintextPassword !== confirmPlaintextPassword) {
        console.log('passwords do not match');
        return res.render('change_password',  { errorMessage: "Passwords do not match." });
    }
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newPlaintextPassword, salt, (err, hash) => {
            sql = `UPDATE users SET password_hash = $1 WHERE id = $2;`;
            sqlParams = [hash, userId];
            db.query(sql, sqlParams, (err, result) => {
                if (err) console.log(err);
                res.redirect('/bookshelf');
            })
        })
    })
})

module.exports = router;
