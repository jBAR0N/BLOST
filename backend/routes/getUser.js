const con = require("../config/db-config")

module.exports = (app)=>{
    app.get("/get/user/:name",(req, res)=>{
        con.query(`
        SELECT u.name, u.description, u.image,
        IF((u.id, ?) IN (SELECT user, follower FROM followed), true, false) AS followed,
        COUNT(DISTINCT f.follower) AS followers,
        COUNT(DISTINCT c.id) AS posts
        FROM users AS u
        LEFT JOIN followed AS f
        ON f.user = u.id
        LEFT JOIN content AS c
        ON c.user_id = u.id
        WHERE name = ?
        `, [req.user? req.user.id: null, req.params.name], (err, result)=>{
            if (err) res.send({success: false, message: "Failed to load user!"})
            else res.send({success:true, content: result[0]})
        })
    })

    app.get("/get/followed", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT u.name, u.image
            FROM
                users AS u
                JOIN followed AS f
                ON f.follower = ? AND f.user = u.id
            `, [req.user.id], (err, result)=>{
                if (err) res.send({success: false, message: "Failed to load writers!"})
                else res.send({success: true, content: result})
            })
        } else {
            res.send({success: false, message: "Failed to load writers!"})
        }
    })
}