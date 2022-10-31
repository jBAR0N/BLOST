const { dbQuery } = require("../config/db-config")
const { authenticate } = require("../src/auth")

module.exports = (app)=>{
    app.post("/follow", async (req, res)=>{
        try {
            await authenticate(req)
            let state = await dbQuery(`SELECT * FROM followed WHERE follower = ? AND user IN (SELECT id FROM users WHERE name = ?)`, [req.user.id, req.body.user])
            if (state.length) {
                dbQuery(`DELETE FROM followed WHERE follower = ? AND user IN (SELECT id FROM users WHERE name = ?)`, [req.user.id, req.body.user])
                res.send({success: true, action: false})
            } else {
                dbQuery(`INSERT INTO followed (user, follower) SELECT u.id, ? FROM users AS u WHERE u.name = ?`, [req.user.id, req.body.user])
                res.send({success: true, action: true})
            }
        } catch { res.send({success: false}) }
    })

    app.post("/bookmark", async (req, res)=>{
        try {
            await authenticate(req)
            let state = await dbQuery(`SELECT * FROM bookmarked WHERE content_id = ? AND user_id = ?`, [req.body.content, req.user.id])
            if (state.length) {
                dbQuery(`DELETE FROM bookmarked WHERE content_id = ? AND user_id = ?`, [req.body.content, req.user.id])
                res.send({success: true, action: false})
            } else {
                dbQuery(`INSERT INTO bookmarked (content_id, user_id) VALUES (?, ?)`, [req.body.content, req.user.id])
                res.send({success: true, action: true})
            }
        } catch { res.send({success: false}) }
    })
}