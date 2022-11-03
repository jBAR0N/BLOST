const { dbQuery } = require("../config/db-config")

module.exports = (app)=>{

     app.get("/get/stories/:by/:keyword/:from/:to", async (req, res)=>{
        try {
            let sql
            switch(req.params.by) {
                case "date": sql = {
                    query: "WHERE c.roll = 'public'", 
                    vars: []
                }
                break;
                case "search": sql = {
                    query: "WHERE c.roll = 'public' AND LOWER(c.title) LIKE ?",
                    vars: ["%" + req.params.keyword.toLowerCase()+ "%"]
                }
                break;
                case "user": sql = {
                    query: "AND u.name = ? WHERE c.roll = 'public'",
                    vars: [req.params.keyword]
                }
                break;
                case "bookmarks": sql = req.isAuthenticated()? {
                    query: "JOIN bookmarked AS b ON c.id = b.content_id AND b.user_id = ? WHERE c.roll = 'public'",
                    vars: [req.user.id]
                } :null
                break;
                case "followed": sql= req.isAuthenticated()? {
                    query: "JOIN followed AS f ON c.user_id = f.user AND f.follower = ? WHERE c.roll = 'public'",
                    vars: [req.user.id]
                } :null
                break;
                case "drafts": sql= req.isAuthenticated()? {
                    query: "AND u.id = ? WHERE c.roll = 'draft'",
                    vars: [req.user.id]
                } :null
                break;
            }
            if (sql) {
                let content = await dbQuery(`
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
                    ${sql.query}
                ) t
                WHERE row >= ? AND row <= ?
                ORDER BY date DESC
                `, [(req.user? req.user.id: null), ...sql.vars, req.params.from, req.params.to])
                res.send({success: true, content})
            } else {res.send({success: false})}
        } catch { res.send({ success: false }) }
    })
}