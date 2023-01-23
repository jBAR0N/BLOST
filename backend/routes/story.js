const { dbQuery } = require("../config/db-config")
const upload = require("../config/multer-config")
const fs = require("fs")
const { authorize, authenticate } = require("../src/auth")

module.exports = (app)=>{

    // Create a new draft and get the id of it

    app.post("/add/story", async (req, res)=>{
        try {
            await authenticate(req)
            let story = await dbQuery("INSERT INTO content (user_id, date) VALUES (?, NOW())", [req.user.id])
            res.send({success: true, story: story.insertId})
        } catch { res.send({success: false}) }
    })

    // Save changes made to a story and delete unused content and images

    app.post("/story/edit", async (req, res) => {
        try {
            await authorize(req, req.body)
        } catch { res.send({success: false})}
    })

    app.post("/set/story", async (req,res)=>{
        try {
            await authorize(req, req.body)
            images = await dbQuery("SELECT filename FROM img_upload WHERE content_id = ?", [req.body.id])
            images.map(item => {
                if(!req.body.sections.some(e => e.content === item.filename && e.type === "image")) {
                    if(fs.existsSync("files/img/" + item.filename)) fs.unlinkSync("files/img/" + item.filename)
                    dbQuery("DELETE FROM img_upload WHERE filename = ? AND content_id = ?", [item.filename, req.body.id])
                }
            })
            dbQuery("UPDATE content SET title = ?, subtitle = ?, date = NOW() WHERE id = ?", [req.body.title, req.body.subtitle, req.body.id])
            await dbQuery("DELETE FROM content_sections WHERE content_id = ?", [req.body.id])
            req.body.sections.map(item => {
                dbQuery("INSERT INTO content_sections (content_id, position, type, text) VALUES (?,?,?,?)"
                , [req.body.id, req.body.sections.indexOf(item), item.type, item.text], ()=>{})
            })
            res.send({success: true})
        } catch { res.send({success: false})}
    })

    // Upload a new image added to a draft

    app.post("/set/story/image", upload.single('image'), async (req, res)=>{
        try {
            await authorize(req, req.body)
            dbQuery("INSERT INTO img_upload (content_id, filename) VALUES (?,?)", [req.body.id, req.file.filename])
            res.send({success: true, file: req.file.filename})
        } catch {
            res.send({success: false})
            if (req.file) if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path)
        }
    })

    // Publish a story and notify followers of publisher

    app.post("/set/story/public", async (req, res)=>{
        try {
            await authorize(req, req.body, true)
            let followed = await dbQuery("SELECT id FROM users WHERE id IN (SELECT follower FROM followed WHERE user = ?)", [req.user.id])
            followed.map(item => {
                dbQuery("INSERT INTO notifications (content_id, user_id) VALUES (?, ?)", [req.body.id, item.id])
            })
            dbQuery("UPDATE content SET roll = 'public' WHERE id = ? AND roll = 'draft'", [req.body.id])
            res.send({success: true})
        } catch { res.send({success: false}) }
    })

    // Delete a story and all images belonging to it

    app.post("/delete/story", async (req, res)=>{
        try {
            await (authorize(req, req.body, true))
            images = await dbQuery("SELECT filename FROM img_upload WHERE content_id = ?", [req.body.id])
            images.map(item => {
                if(fs.existsSync("files/img/" + item.filename)) fs.unlinkSync("files/img/" + item.filename)
            })
            await dbQuery("DELETE FROM content WHERE id = ?", [req.body.id])
            res.send({success: true})
        } catch { res.send({success: false}) }
    })

    // Get a story (reader view)

    app.get("/get/story/:id", async (req, res)=>{
        try {
            mainInfo = await dbQuery(`
            SELECT 
                c.title, c.subtitle, c.date, u.name, u.image,
                IF((c.id, ?) IN (SELECT content_id, user_id FROM bookmarked), true, false) AS bookmarked
            FROM 
                content AS c 
                JOIN users AS u 
                ON u.id = c.user_id 
            WHERE c.id = ? AND (c.roll = 'public' OR c.roll = 'about')
            `, [req.isAuthenticated()? req.user.id: null, req.params.id])
            content = await dbQuery("SELECT type, text FROM content_sections WHERE content_id = ? ORDER BY position", [req.params.id])
            res.send({
                ...mainInfo[0],
                content,
                success: true
            })
        } catch { res.send({success: false}) }
    })

    // Get the content of a story, make it a draft if it is published and delete all notifications pointing to it

    app.post("/get/draft/:id", async (req, res)=>{
        try {
            await authorize(req, req.params)
            let mainInfo = await dbQuery("SELECT title, subtitle, roll FROM content WHERE id = ?", [req.params.id])
            let content = await dbQuery("SELECT type, text FROM content_sections WHERE content_id = ? ORDER BY position", [req.params.id])
            dbQuery("UPDATE content SET roll = 'draft' WHERE id = ? AND roll='public'", [req.params.id])
            dbQuery("DELETE FROM notifications WHERE content_id = ?", [req.params.id])
            res.send({
                ...mainInfo[0],
                content,
                success: true
            })
        } catch { res.send({success: false}) }
    })
}