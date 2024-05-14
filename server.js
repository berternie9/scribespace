require('dotenv').config();

const express = require('express');
const _ = require('lodash');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const sessionRouter = require('./routes/session_router.js');
const homeRouter = require('./routes/home_router.js');
const setCurrentUser = require('./middlewares/set_current_user.js');
const ensureLoggedIn = require('./middlewares/ensure_logged_in.js');

const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(express.static('static'));
app.use(methodOverride('_method'));
app.use(express.urlencoded());

app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser);

app.use(homeRouter);
app.use(sessionRouter);
app.use(ensureLoggedIn);

app.listen(port, () => {
    console.log(`Working on port ${port}`);
})