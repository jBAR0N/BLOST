const path = require("path")
const con = require("../config/db-config")
const upload = require("../config/multer-config")
const fs = require("fs")

module.exports = (app)=>{
    app.post("/set/article/new", (req, res)=>{
        if (req.isAuthenticated()) {
            con.query("INSERT INTO content (user_id, date) VALUES (?, NOW())", [req.user.id], (err, result)=>{
                if (err) res.send({success: false})
                else res.send({success: true, story: result.insertId})
            })
        } else res.send({success: false})
    })

    app.post("/set/article", (req,res)=>{
        con.query("SELECT user_id FROM content WHERE id = ?", [req.body.id], (err, result)=>{
            if ((result[0]? result[0].user_id: undefined === (req.user? req.user.id: null) )&& req.isAuthenticated()) {
                con.query("SELECT filename FROM img_upload WHERE content_id = ?", [req.body.id], (err, stored)=>{
                    if (stored) {
                        stored.map(item => {
                            if(!req.body.sections.some(e => e.content === item.filename && e.type === "image")) {
                                if(fs.existsSync("files/img/" + item.filename)) fs.unlinkSync("files/img/" + item.filename)
                                con.query("DELETE FROM img_upload WHERE filename = ? AND content_id = ?", [item.filename, req.body.id])
                            }
                        })
                        con.query("UPDATE content SET title = ?, subtitle = ? WHERE id = ?", [req.body.title, req.body.subtitle, req.body.id], (err)=>{
                            if (!err)
                            con.query("DELETE FROM content_sections WHERE content_id = ?", [req.body.id], (err)=>{
                                if (err) res.send({success: false})
                                else res.send({success:true})
                                if (!err)
                                req.body.sections.map(item => {
                                    con.query("INSERT INTO content_sections (content_id, position, type, title, content) VALUES (?,?,?,?,?)"
                                    , [req.body.id, req.body.sections.indexOf(item), item.type, item.title, item.content], ()=>{})
                                })
                            })
                        })
                    }
                })
            } else res.send({success: false})
        })
    })

    app.post("/set/article/image", upload.single('image'), (req, res)=>{
        con.query("SELECT user_id FROM content WHERE id = ?", [req.body.id], (err, result)=>{
            if ((result[0]? result[0].user_id: undefined === (req.user? req.user.id: null)) && req.file && req.isAuthenticated()) 
                con.query("INSERT INTO img_upload (content_id, filename) VALUES (?,?)", [req.body.id, req.file.filename],(err, result)=>{
                    if (!err) res.send({success: true, file: req.file.filename})
                    else res.send({success: false})
                })
            else {
                res.send({success: false})
                if (req.file) if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
            }
        })
    })

    app.post("/set/article/public", (req, res)=>{
        con.query("SELECT user_id FROM content WHERE id = ?", [req.body.id], (err, result)=>{
            if ((result[0]? result[0].user_id: undefined === (req.user? req.user.id: null)) && req.isAuthenticated())
                con.query("UPDATE content SET roll = 'public' WHERE id = ?", [req.body.id], (err, result)=>{
                    if (err) res.send({success: false})
                    else res.send({success: true, action: true})
                })
            else res.send({success: false})
        })
    })

    app.post("/delete/article", (req, res)=>{
        con.query("SELECT user_id FROM content WHERE id = ?", [req.body.id], (err, result)=>{
            if ((result[0]? result[0].user_id: undefined === (req.user? req.user.id: null)) && req.isAuthenticated())
            con.query("SELECT filename FROM img_upload WHERE content_id = ?", [req.body.id], (err, result)=>{
                if (err) res.send({success: false})
                else {
                    result.map(item => {
                        if(fs.existsSync("files/img/" + item.filename)) fs.unlinkSync("files/img/" + item.filename)
                    })
                    con.query(`DELETE FROM content WHERE id = ?`, [req.body.id], (err, result)=>{
                        if (err) res.send({success: false})
                        else res.send({success: true})
                    })
                }
            })
            else res.send({success: false})
        })
    })

    app.get("/get/article/:id", (req,res)=>{
        con.query("SELECT title, subtitle FROM content WHERE id = ? AND roll = 'public'", [req.params.id], (err, mainInfo)=>{
            if (err || mainInfo.length === 0) res.send({success: false})
            else con.query("SELECT type, title, content FROM content_sections WHERE content_id = ? ORDER BY position", [req.params.id], (err, result)=>{
                if (err) res.send({success: false})
                else res.send({
                    title: mainInfo[0].title,
                    subtitle: mainInfo[0].subtitle,
                    content: result,
                    success: true
                })
            })
        })
    })

    app.post("/get/draft/:id", (req,res)=>{
        con.query("SELECT user_id FROM content WHERE id = ?", [req.params.id], (err, result)=>{
            if ((result[0]? result[0].user_id: undefined === (req.user? req.user.id: null)) && req.isAuthenticated())
            con.query("SELECT title, subtitle, roll FROM content WHERE id = ?", [req.params.id], (err, mainInfo)=>{
                if (err) res.send({success: false})
                else con.query("SELECT type, title, content FROM content_sections WHERE content_id = ? ORDER BY position", [req.params.id], (err, result)=>{
                    if (err) res.send({success: false})
                    else 
                    con.query("UPDATE content SET roll = 'draft' WHERE id = ? AND roll='public'", [req.params.id],(err)=>{
                        if (err) res.send({success: false})
                        else res.send({
                            ...mainInfo[0],
                            content: result,
                            success: true
                        })
                    })
                })
            }); else res.send({success: false})
        })
    })
}