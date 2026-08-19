const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const ejsMate = require('ejs-mate');

//middleware

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assects')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/home', (req, res) => {
    res.render("home.ejs");
});
app.get('/login', (req, res) => {
    res.render("login.ejs");
});
app.get('/register', (req, res) => {
    res.render("signup.ejs");
});
app.get('/dashboard', (req, res) => {
    res.render("dashboard.ejs");
});
