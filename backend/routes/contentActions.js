const con = require("../config/db-config")

module.exports = (app)=>{
    app.post("/follow", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`SELECT * FROM followed WHERE follower = ? AND user IN (SELECT id FROM users WHERE name = ?)`, [req.user.id, req.body.user], (err, result)=>{
                if (result.length === 0) {
                    con.query(`INSERT INTO followed (user, follower) SELECT u.id, ? FROM users AS u WHERE u.name = ?`, [req.user.id, req.body.user], (err)=>{
                        if (err) {res.send({success: false})}
                        else res.send({success:true, action:true})
                    })
                } else if (result.length > 0) {
                    con.query(`DELETE FROM followed WHERE follower = ? AND user IN (SELECT id FROM users WHERE name = ?)`, [req.user.id, req.body.user], (err)=>{
                        if (err) {res.send({success: false})}
                        else res.send({success:true, action:false})
                    })
                } else res.send({success: false})
            })
        } else res.send({success: false, message:"You are not signed in!"})
    })

    app.post("/bookmark", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`SELECT * FROM bookmarked WHERE content_id = ? AND user_id = ?`, [req.body.content, req.user.id], (err, result)=>{
                if (result.length === 0) {
                    con.query(`INSERT INTO bookmarked (content_id, user_id) VALUES (?, ?)`, [req.body.content, req.user.id], (err)=>{
                        if (err) {res.send({success: false})}
                        else res.send({success: true, action: true})
                    })
                } else if (result.length > 0) {
                    con.query(`DELETE FROM bookmarked WHERE content_id = ? AND user_id = ?`, [req.body.content, req.user.id], (err)=>{
                        if (err) {res.send({success: false})}
                        else res.send({success: true, action: false})
                    })
                } else res.send({success: false})
            })
        } else res.send({success: false, message:"You are not signed in!"})
    })
}