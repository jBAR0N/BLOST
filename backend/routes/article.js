const path = require("path")
const con = require("../config/db-config")

module.exports = (app)=>{
    app.post("/set/article/new", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query("INSERT INTO content (user_id, date) VALUES (?, NOW())", [req.user.id], (err, result)=>{
                if (err) res.send({success: false})
                else res.send({success: true, article: result.insertId})
            })
        } else res.send({success: false})
    })

    app.post("/set/article", (req,res)=>{
        if (req.isAuthenticated()) {
            con.query("UPDATE content SET title = ?, subtitle = ? WHERE id = ?", [req.body.title, req.body.subtitle, req.body.id], (err)=>{
                 if (!err)
                 con.query("DELETE FROM content_sections WHERE content_id = ?", [req.body.id], (err)=>{
                    if (err) res.send({success: false})
                    else res.send({success:true})
                    if (!err)
                    req.body.sections.map(item => {
                        con.query("INSERT INTO content_sections (content_id, position, type, title, content) VALUES (?,?,?,?,?)"
                        , [req.body.id, req.body.sections.indexOf(item), item.type, item.title, item.content], (err)=>{})
                    })
                })
            })
        } else res.send({success: false})
    })

    app.get("/get/article", (req,res)=>{
        res.send({success:false})
    })
}