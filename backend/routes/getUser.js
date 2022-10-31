const { dbQuery } = require("../config/db-config")
const { authenticate } = require("../src/auth")

module.exports = (app)=>{
    app.get("/get/user/:name",async (req, res)=>{
        try {
            user = await dbQuery(`
            SELECT u.name, u.image, u.about,
            IF((u.id, ?) IN (SELECT user, follower FROM followed), true, false) AS followed,
            COUNT(DISTINCT f.follower) AS followers,
            COUNT(DISTINCT c.id) AS posts
            FROM users AS u
            LEFT JOIN followed AS f
            ON f.user = u.id
            LEFT JOIN content AS c
            ON c.user_id = u.id AND c.roll = 'public'
            WHERE name = ?
            `, [req.user? req.user.id: null, req.params.name])
            res.send({success:true, content: user[0]})
        } catch { res.send({success: false}) }
    })

    app.post("/get/notifications", async (req, res)=>{
        try {
            await authenticate(req)
            content = await dbQuery(`
            SELECT u.name, c.title, c.id
            FROM
                notifications AS n
                JOIN content AS c
                ON n.content_id = c.id
                JOIN users AS u
                ON u.id = c.user_id
            WHERE n.user_id = ?
            `, [req.user.id])
            dbQuery("UPDATE notifications SET noticed = 1 WHERE user_id = ?", [req.user.id])
            res.send({success: true, content})
        } catch { res.send({success: false}) }
    })

    app.post("/delete/notification", async (req, res)=>{
        try {
            await authenticate(req)
            dbQuery(`DELETE FROM notifications WHERE content_id = ? AND user_id = ?`, [req.body.content, req.user.id])
            res.send({success: true})
        } catch { res.send({success: false}) }
    })
}