const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()

const passport = require('passport');

require('./config/passport-config')(passport);

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
  });

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '..', 'Frontend', 'build')))
app.use('/img', express.static(path.join('public', "img")));

require("./routes/authUser")(app, passport)
require("./routes/setUser")(app)
require("./routes/getArticles")(app)
require("./routes/getUser")(app)
require("./routes/article")(app)
require("./routes/contentActions")(app)
require("./routes/main")(app)

app.listen(3000)