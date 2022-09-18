const con = require("../config/db-config")

module.exports = (app)=>{
    app.get("/get/user/:name",(req, res)=>{
        con.query(`
        SELECT u.name, u.description, u.image,
        IF(f.follower IS NULL, false, true) AS followed
        FROM
            users AS u
            LEFT JOIN followed AS f
            ON f.follower = ? AND f.user = u.id
        WHERE name = ?
        `, [req.user? req.user.id: null, req.params.name], (err, result)=>{
            if (err) res.send({success: false, message: "Something went wrong. Try again!"})
            else res.send({success:true, content: result[0]})
        })
    })

    app.get("/get/followed", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT u.name, u.image
            FROM
                users AS u
                LEFT JOIN followed AS f
                ON f.follower = ? AND f.user = u.id
            WHERE f.user IS NOT NULL
            `, [req.user? req.user.id: null], (err, result)=>{
                if (err) res.send({success: false, message: "Something went wrong. Try again!"})
                else res.send({success: true, content: result})
            })
        } else {
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })
}