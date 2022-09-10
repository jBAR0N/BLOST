const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')
const con = require('./db-config')


module.exports = function (passport) {

    passport.serializeUser((user, done) => done(null, user))

    passport.deserializeUser((user, done) => 
        con.query("SELECT * FROM users WHERE id = ?", [user.id], (err, rows)=>{
            done(err, rows[0]);
        })
    )

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        (req, email, password, done)=>{
            con.query("SELECT * FROM users WHERE email = ?", [email], (err, rows)=>{
                if (err)
                    return done(err)
                if (rows.length) {
                    return done(null, false, {message: 'Email is already in use!'});
                } else {
                    var newUser = {
                        email: email,
                        password: bcrypt.hashSync(password, 10)
                    }
                    con.query("INSERT INTO users ( email, hash ) values (?,?)", [newUser.email, newUser.password], (err, rows)=>{
                        newUser.id = rows.insertId;
                        return done(null, newUser)
                    })
                }
            })
        })
    )

    passport.use(
        'local-signin',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        }, (req, email, password, done)=>{
            con.query("SELECT * FROM users WHERE email = ?",[email], (err, rows) => {
                if (err) 
                    return done(err)
                if (!rows.length) {
                    return done(null, false, {message: 'Incorrect email or passsword!'})
                }
                if (!bcrypt.compareSync(password, rows[0].hash))
                    return done(null, false, {message: 'Incorrect email or passsword!'})
                return done(null, rows[0]);
            })
        })
    )
    
}