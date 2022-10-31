const { dbQuery } = require("../config/db-config")
const upload = require("../config/multer-config")
const bcrypt = require("bcrypt")
const fs = require("fs")
const { authenticate, compare } = require("../src/auth")

module.exports = (app)=>{

    app.post("/set/name", async (req, res)=>{
        try {
            await authenticate(req)
            sameName = await dbQuery("SELECT * FROM users WHERE name = ?", [req.body.object])
            if (sameName.length === 0 && req.body.object.length <= 50) {
                dbQuery("UPDATE users SET name = ? WHERE id = ?", [req.body.object, req.user.id])
                res.send({ success: true })
            } else res.send({ success: false })
        } catch { res.send({ success: false }) }
    })
    
    app.post("/set/email", async (req, res)=>{
        try {
            await authenticate(req)
            sameEmail = await dbQuery("SELECT * FROM users WHERE email = ?", [req.body.object])
            if (sameEmail.length === 0 && req.body.object.length <= 255) {
                dbQuery("UPDATE users SET email = ? WHERE id = ?", [req.body.object, req.user.id])
                res.send({ success: true} )
            } else res.send({ success: false })
        } catch { res.send({ success: false}) }
    })

    app.post("/set/image", upload.single('image'), async (req, res)=>{
        try {
            await authenticate(req)
            if (req.user.image) { if (fs.existsSync("files/img/" + req.user.image)) fs.unlinkSync("files/img/" + req.user.image) }
            dbQuery("UPDATE users SET image = ? WHERE id = ?", [req.file.filename, req.user.id])
            res.send({success: true})
        } catch {
            if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
            res.send({ success: false })
        }
    })

    app.post("/set/password", async (req, res)=>{
        try {
            await authenticate(req)
            await compare(req.body.old, req.user.hash)
            const password = bcrypt.hashSync(req.body.new, 10)
            dbQuery("UPDATE users SET hash = ? WHERE id = ?", [password, req.user.id])
            res.send({success: true})
        } catch { res.send({success: false}) }
    })

    app.post("/delete/profile", async (req, res)=>{
        try {
            await authenticate(req)
            await compare(req.body.password, req.user.hash)
            let images = await dbQuery("SELECT filename FROM img_upload WHERE content_id IN (SELECT id FROM content WHERE user_id = ?)", [req.user.id])
            images.map(item => {
                if (item.filename) { if (fs.existsSync("files/img/" + item.filename)) fs.unlinkSync("files/img/" + item.filename) }
            })
            dbQuery("DELETE FROM users WHERE id = ?", [req.user.id])
            if (req.user.image) { if (fs.existsSync("files/img/" + req.user.image)) fs.unlinkSync("files/img/" + req.user.image) }
            req.logout(()=>{
                res.send({success: true})  
            })
        } catch { res.send({success: false}) }
    })
}