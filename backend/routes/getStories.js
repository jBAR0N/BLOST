const { con } = require("../config/db-config")

module.exports = (app)=>{

    app.get("/get/stories/date/:from/:to",(req, res)=>{
        con.query(`
        SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
        (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                c.date, c.title, c.subtitle, c.id, u.image, u.name,
                IF((c.id, ?) IN (SELECT content_id, user_id FROM bookmarked), true, false) AS bookmarked
            FROM
                content AS c
                JOIN users AS u
                ON u.id = c.user_id
            WHERE c.roll = 'public'
        ) t
        WHERE row >= ? AND row <= ?
        ORDER BY date DESC
        `, [req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
            if(err) res.send({success: false, message: "Failed to load content!"})
            else res.send({success: true, content: result})
        })
    })

    app.get("/get/stories/bookmarks/:from/:to",(req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
            (
                SELECT 
                    ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                    c.date, c.title, c.subtitle, c.id, u.image, u.name, TRUE AS bookmarked
                FROM
                    content AS c
                    JOIN users AS u
                    ON u.id = c.user_id
                    JOIN bookmarked AS b
                    ON c.id = b.content_id AND b.user_id = ?
                WHERE c.roll = 'public'
            ) t
            WHERE row >= ? AND row <= ?
            ORDER BY date DESC
            `, [req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
                if(err) res.send({success: false, message: "Failed to load content!"})
                else res.send({success: true, content: result})
            })
        } else res.send({success: false, message: "Failed to load content!"})
    })

    app.get("/get/stories/followed/:from/:to",(req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
            (
                SELECT 
                    ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                    c.date, c.title, c.subtitle, c.id, u.image, u.name,
                    IF((c.id, ?) IN (SELECT content_id, user_id FROM bookmarked), true, false) AS bookmarked
                FROM
                    content AS c
                    JOIN users AS u
                    ON u.id = c.user_id
                    JOIN followed AS f
                    ON c.user_id = f.user AND f.follower = ?
                WHERE c.roll = 'public'
            ) t
            WHERE row >= ? AND row <= ?
            ORDER BY date DESC
            `, [req.user? req.user.id: null, req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
                if(err) res.send({success: false, message: "Failed to load content!"})
                else res.send({success: true, content: result})
            })
        } else res.send({success: false, message: "Failed to load content!"})
    })

    app.get("/get/stories/search/:keyword/:from/:to",(req, res)=>{
        con.query(`
        SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
        (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                c.date, c.title, c.subtitle, c.id, u.image, u.name,
                IF((c.id, ?) IN (SELECT content_id, user_id FROM bookmarked), true, false) AS bookmarked
            FROM
                content AS c
                JOIN users AS u
                ON u.id = c.user_id
            WHERE c.roll = 'public' AND LOWER(c.title) LIKE ?
        ) t
        WHERE row >= ? AND row <= ?
        ORDER BY date DESC
        `, [req.user? req.user.id: null, "%" + req.params.keyword.toLowerCase()+ "%", req.params.from , req.params.to], (err, result)=>{
            if(err) res.send({success: false, message: "Failed to load content!"})
            else res.send({success: true, content: result})
        })
    })

    app.get("/get/stories/user/:user/:from/:to",(req, res)=>{
            con.query(`
            SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
            (
                SELECT 
                    ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                    c.date, c.title, c.subtitle, c.id, u.image, u.name,
                    IF((c.id, ?) IN (SELECT content_id, user_id FROM bookmarked), true, false) AS bookmarked
                FROM
                    content AS c
                    JOIN users AS u
                    ON u.id = c.user_id AND u.name = ?
                WHERE c.roll = 'public'
            ) t
            WHERE row >= ? AND row <= ?
            ORDER BY date DESC
            `, [req.user? req.user.id: null, req.params.user, req.params.from , req.params.to], (err, result)=>{
                if(err) res.send({success: false, message: "Failed to load content!"})
                else res.send({success: true, content: result})
            })
    })

    app.get("/get/stories/drafts/:from/:to",(req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
            (
                SELECT 
                    ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                    c.date, c.title, c.subtitle, c.id, u.image, u.name,
                    IF((c.id, ?) IN (SELECT content_id, user_id FROM bookmarked), true, false) AS bookmarked
                FROM
                    content AS c
                    JOIN users AS u
                    ON u.id = c.user_id AND u.id = ?
                WHERE c.roll = 'draft'
            ) t
            WHERE row >= ? AND row <= ?
            ORDER BY date DESC
            `, [req.user.id, req.user.id, req.params.from , req.params.to], (err, result)=>{
                if(err) res.send({success: false, message: "Failed to load content!"})
                else res.send({success: true, content: result})
            })
        }
    })
}