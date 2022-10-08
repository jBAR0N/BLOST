const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')
const con = require('./db-config')


module.exports = passport => {

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
            con.query("SELECT * FROM users WHERE email = ? OR name = ?", [email, req.body.name], (err, rows)=>{
                if (err)
                    return done(err)
                if (rows.length) {
                    return done(null, false)
                } if (email.length > 255 || req.body.name.length > 100) {
                    return done(null, false)
                } else {
                    var newUser = {
                        email: email,
                        password: bcrypt.hashSync(password, 10)
                    }
                    con.query("INSERT INTO users ( email, hash, name ) values (?,?,?)", [newUser.email, newUser.password, req.body.name], (err, rows)=>{
                        con.query("INSERT INTO content ( date, user_id, roll ) VALUES ( NOW(), ?, 'about' )", [rows.insertId], (err, result)=>{
                            con.query("UPDATE users SET about = ? WHERE id = ?", [result.insertId, rows.insertId], ()=>{
                                newUser.id = rows.insertId;
                                return done(null, newUser)
                            })
                        })
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