const LocalStrategy = require('passport-local').Strategy

const bcrypt = require('bcrypt')
const { dbQuery } = require('./db-config')


module.exports = passport => {

    passport.serializeUser((user, done) => done(null, user))

    passport.deserializeUser(async (user, done) => {
        try {
            let result = await dbQuery("SELECT * FROM users WHERE id = ?", [user.id])
            done(null, result[0]);
        } catch(err) { done(err, false) }
    })

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        async (req, email, password, done)=>{
            try {
                sameCreds = await dbQuery("SELECT * FROM users WHERE email = ? OR name = ?", [email, req.body.name])
                if (sameCreds.length) return done(null, false)
                if (email.length > 255) return done(null, false)
                else {
                    let newUser = {
                        email: email,
                        password: bcrypt.hashSync(password, 10)
                    }
                    let user = await dbQuery("INSERT INTO users ( email, hash, name ) values (?,?,?)", [newUser.email, newUser.password, req.body.name])
                    let about = await dbQuery("INSERT INTO content ( date, user_id, roll ) VALUES ( NOW(), ?, 'about' )", [user.insertId])
                    await dbQuery("UPDATE users SET about = ? WHERE id = ?", [about.insertId, user.insertId])
                    newUser.id = user.insertId;
                    return done(null, newUser)
                }
            } catch(err) {console.log(err); return done(err)}
        })
    )

    passport.use(
        'local-signin',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        }, async (req, email, password, done)=>{
            try {
                let user = await dbQuery("SELECT * FROM users WHERE email = ?",[email])
                if (!user.length) return done(null, false)
                if (!bcrypt.compareSync(password, user[0].hash)) return done(null, false)
                return done(null, user[0])
            } catch(err) { return done(err) }
        })
    )
    
}