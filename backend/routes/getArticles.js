const con = require("../config/db-config")

module.exports = (app)=>{
    app.get("/get/tags", (req, res) =>{
        con.query("SELECT name FROM tags",(err, result)=>{
            if(err) res.send({success: false, message: "Failed to load tags!"})
            else res.send({success: true, content: result})
        })
    })

    app.get("/get/articles/date/:from/:to",(req, res)=>{
        con.query(`
        SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
        (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                c.date, c.title, c.subtitle, c.id,
                u.image, u.name,
                IF(b.user_id IS NULL, false, true) AS bookmarked
            FROM
                content AS c
                LEFT JOIN users AS u
                ON u.id = c.user_id
                LEFT JOIN bookmarked AS b
                ON c.id = b.content_id AND b.user_id = ?
            WHERE c.published = 1
        ) t
        WHERE row >= ? AND row <= ?
        ORDER BY date DESC
        `, [req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
            if(err) res.send({success: false, message: "Failed to load content!"})
            else res.send({success: true, content: result})
        })
    })

    app.get("/get/articles/bookmarks/:from/:to",(req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
            (
                SELECT 
                    ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                    c.date, c.title, c.subtitle, c.id,
                    u.image, u.name,
                    IF(b.user_id IS NULL, false, true) AS bookmarked
                FROM
                    content AS c
                    LEFT JOIN users AS u
                    ON u.id = c.user_id
                    LEFT JOIN bookmarked AS b
                    ON c.id = b.content_id AND b.user_id = ?
                WHERE c.published = 1 AND b.user_id IS NOT NULL
            ) t
            WHERE row >= ? AND row <= ?
            ORDER BY date DESC
            `, [req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
                if(err) res.send({success: false, message: "Failed to load content!"})
                else res.send({success: true, content: result})
            })
        } else res.send({success: false, message: "Failed to load content!"})
    })

    app.get("/get/articles/followed/:from/:to",(req, res)=>{
        if (req.isAuthenticated()) {
            con.query(`
            SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
            (
                SELECT 
                    ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                    c.date, c.title, c.subtitle, c.id,
                    u.image, u.name,
                    IF(b.user_id IS NULL, false, true) AS bookmarked
                FROM
                    content AS c
                    LEFT JOIN users AS u
                    ON u.id = c.user_id
                    LEFT JOIN bookmarked AS b
                    ON c.id = b.content_id AND b.user_id = ?
                    LEFT JOIN followed AS f
                    ON c.user_id = f.user AND f.follower = ?
                WHERE c.published = 1 AND f.user IS NOT NULL
            ) t
            WHERE row >= ? AND row <= ?
            ORDER BY date DESC
            `, [req.user? req.user.id: null, req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
                if(err) res.send({success: false, message: "Failed to load content!"})
                else res.send({success: true, content: result})
            })
        } else res.send({success: false, message: "Failed to load content!"})
    })

    app.get("/get/articles/search/:keyword/:from/:to",(req, res)=>{
        con.query(`
        SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
        (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                c.date, c.title, c.subtitle, c.id,
                u.image, u.name,
                IF(b.user_id IS NULL, false, true) AS bookmarked
            FROM
                content AS c
                LEFT JOIN users AS u
                ON u.id = c.user_id
                LEFT JOIN bookmarked AS b
                ON c.id = b.content_id AND b.user_id = ?
            WHERE c.published = 1 AND LOWER(c.title) LIKE ?
        ) t
        WHERE row >= ? AND row <= ?
        ORDER BY date DESC
        `, [req.user? req.user.id: null, "%" + req.params.keyword.toLowerCase()+ "%", req.params.from , req.params.to], (err, result)=>{
            if(err) res.send({success: false, message: "Failed to load content!"})
            else res.send({success: true, content: result})
        })
    })
    app.get("/get/articles/tag/:keyword/:from/:to",(req, res)=>{
        con.query(`
        SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name, t.id FROM
        (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                c.date, c.title, c.subtitle, c.id,
                u.image, u.name,
                IF(b.user_id IS NULL, false, true) AS bookmarked
            FROM
                content AS c
                LEFT JOIN users AS u
                ON u.id = c.user_id
                LEFT JOIN bookmarked AS b
                ON c.id = b.content_id AND b.user_id = ?
                LEFT JOIN tags AS t
                ON t.name = ?
                LEFT JOIN tagged AS td
                ON c.id = td.content AND td.tag = t.id
            WHERE c.published = 1 AND td.tag IS NOT NULL
        ) t
        WHERE row >= ? AND row <= ?
        ORDER BY date DESC
        `, [req.user? req.user.id: null,req.params.keyword, req.params.from , req.params.to], (err, result)=>{
            if(err) res.send({success: false, message: "Failed to load content!"})
            else res.send({success: true, content: result})
        })
    })
}