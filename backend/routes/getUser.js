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
            if (!result) res.send({success: false, message: "Something went wrong. Try again!"})
            else res.send(result[0])
        })
    })

    app.get("/get/followed", (req, res)=>{
        
    })
}