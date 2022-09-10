const con = require("../config/db-config")

module.exports = (app)=>{
    app.get("/get/user/:name",(req, res)=>{
        con.query("SELECT name, description, image FROM users WHERE name = ?", req.params.name, (err, result)=>{
            if (!result) res.send({success: false})
            else res.send(result[0])
        })
    })

    app.get("/get/followed", (req, res)=>{
        
    })
}