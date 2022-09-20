const con = require("../config/db-config")
const upload = require("../config/multer-config")
const bcrypt = require("bcrypt")
const fs = require("fs")

module.exports = (app)=>{

    app.post("/set/name",(req, res)=>{
        if (req.isAuthenticated()) {
            if (req.body.length <= 100) {
                con.query("SELECT * FROM users WHERE name = ?", [req.body.object], (err, result)=>{
                    if (result.length === 0) {
                        con.query("UPDATE users SET name = ? WHERE id = ?", [req.body.object, req.user.id], (err)=>{
                            if (err) res.send({success: false, message: "Something went wrong. Try again!"})
                            else res.send({success: true})
                        })
                    } else res.send({success: false, message: "Name is already in use!"})
                })
            } else res.send({success: false, message: "Maximum length is 100 characters!"})
        } else res.send({success: false, message: "Something went wrong. Try again!"})
    })
    
    app.post("/set/description",(req, res)=>{
        if (req.isAuthenticated()) {
            if (req.body.length <= 5000) {
                con.query("UPDATE users SET description = ? WHERE id = ?", [req.body.object, req.user.id], (err)=>{
                    if (err) res.send({success: false, message: "Something went wrong. Try again!"})
                    else res.send({success: true})
                })
            } else res.send({success: false, message: "Maximum length is 5000 characters!"})
        } else res.send({success: false, message: "Something went wrong. Try again!"})
    })
    
    app.post("/set/email",(req, res)=>{
        if (req.isAuthenticated()) {
            if (req.body.length <= 5000) {
                con.query("SELECT * FROM users WHERE email = ?", [req.body.object], (err, result)=>{
                    if (result.length === 0) {
                        con.query("UPDATE users SET email = ? WHERE id = ?", [req.body.object, req.user.id], (err)=>{
                            if (err) res.send({success: false, message: "Something went wrong. Try again!"})
                            else res.send({success: true})
                        })
                    } else res.send({success: false, message: "Email is already in use!"})
                })
            } else res.send({success: false, message: "Maximum length is 255 characters!"})
        } else res.send({success: false, message: "Something went wrong. Try again!"})
    })

    app.post("/set/image", upload.single('image'), (req, res)=>{
        if (req.isAuthenticated()) {
            if (req.user.image) { if (fs.existsSync("files/img/" + req.user.image)) fs.unlinkSync("files/img/" + req.user.image) }
            con.query("UPDATE users SET image = ? WHERE id = ?", [req.file.filename, req.user.id], (err)=>{
                if (err) res.send({success: false, message: "Something went wrong. Try again!"})
                else res.send({success: true})
            })
        } else {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })

    app.post("/set/password", (req, res)=>{
        if (req.isAuthenticated()) {
            if (bcrypt.compareSync(req.body.old, req.user.hash)) {
                const password = bcrypt.hashSync(req.body.new, 10)
                con.query("UPDATE users SET hash = ? WHERE id = ?", [password, req.user.id], (err)=>{
                    if (err) res.send({success: false, message: "Something went wrong. Try again!"})
                    else res.send({success: true})
                })
            } else {
                res.send({success: false, message: "Wrong password!"})
            }
        } else {
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })

    app.post("/delete/profile", (req, res)=>{
        if (req.isAuthenticated()) {
            if (bcrypt.compareSync(req.body.password, req.user.hash)) {
                con.query("DELETE FROM users WHERE id = ?", [req.user.id], (err)=>{
                    if (err) {res.send({success: false, message: "Something went wrong. Try again!"})}
                    else {
                        if (req.user.image) { if (fs.existsSync("files/img/" + req.user.image)) fs.unlinkSync("files/img/" + req.user.image) }
                        req.logout(()=>{
                            res.send({success: true})  
                        })
                    }
                })
            } else {
                res.send({success: false, message: "Wrong password!"})
            }
        } else {
            res.send({success: false, message: "Something went wrong. Try again!"})
        }
    })
}