const con = require("../config/db-config")

module.exports = (app)=>{
    // TODO check for all of these relations, if they already exist

    app.post("/follow", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            INSERT INTO followed (user, follower) 
            SELECT u.id, ?
            FROM users AS u
            WHERE u.name = ?
            `, [req.user.id, req.body.user], (err)=>{
                if (err) {res.send({success: false, message: "Something went wrong. Try again!"})}
                else res.send({success: true})
            })
        } else {
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })

    app.post("/like", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`INSERT INTO liked (content_id, user_id) VALUES (?, ?)`, [req.body.content, req.user.id], (err)=>{
                if (err) {res.send({success: false, message: "Something went wrong. Try again!"})}
                else res.send({success: true})
            })
        } else {
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })

    app.post("/bookmark", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`INSERT INTO bookmarked (content_id, user_id) VALUES (?, ?)`, [req.body.content, req.user.id], (err)=>{
                if (err) {res.send({success: false, message: "Something went wrong. Try again!"})}
                else res.send({success: true})
            })
        } else {
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })
}