function ensureLoggedIn (req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.send('Please log in first.');
    };
}

module.exports = ensureLoggedIn;