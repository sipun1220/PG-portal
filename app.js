require('dotenv').config();

const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.js');

//middleware

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assects')));
app.use(userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/home', (req, res) => {
    res.render("home.ejs");
});
app.get('/register', (req, res) => {
    res.render("signup.ejs");
});
app.get('/dashboard', (req, res) => {
    res.render("dashboard.ejs");
});
app.get('/dashhome', (req, res) => {
    res.render("dashhome.ejs");
});
app.get('/show', (req, res) => {
    res.render("show.ejs");
});
app.get('/show', (req, res) => {
    res.render("show.ejs");
});
app.get('/civicform', (req, res) => {
    res.render("civicform.ejs");
});