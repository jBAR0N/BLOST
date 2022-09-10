const con = require("../config/db-config")

module.exports = (app)=>{
    app.get("/get/articles/date/:from/:to",(req, res)=>{
        con.query(`
        SELECT t.date, t.title, t.subtitle, t.image, t.bookmarked, t.name FROM
        (
            SELECT 
                ROW_NUMBER() OVER(ORDER BY c.date DESC) row,
                c.date, c.title, c.subtitle, c.published, c.id,
                u.image, u.name,
                IF(b.user_id IS NULL, false, true) AS bookmarked
            FROM
                content AS c
                LEFT JOIN users AS u
                ON u.id = c.user_id
                LEFT JOIN bookmarked AS b
                ON c.id = b.content_id AND b.user_id = ?
        ) t
        WHERE published = 1 AND row >= ? AND row <= ?
        ORDER BY date DESC
        `, [req.user? req.user.id: null, req.params.from , req.params.to], (err, result)=>{
            res.send({success: true, content: result})
        })
    })
}