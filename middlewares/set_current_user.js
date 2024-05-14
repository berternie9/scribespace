const db = require('../db');

function setCurrentUser (req, res, next) {
    res.locals.currentUser = {};
    res.locals.isLoggedIn = false;

    if (!req.session.userId) {
        return next();
    }
    const sql = `SELECT * FROM users WHERE id = $1;`;
    const sqlParams = [req.session.userId];

    db.query(sql, sqlParams, (err, result) => {
        if (err) console.log(err);
        let user = result.rows[0];
        res.locals.currentUser = user;
        res.locals.isLoggedIn = true;
        next();
    })
}

module.exports = setCurrentUser;