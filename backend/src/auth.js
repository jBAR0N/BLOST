const { dbQuery } = require("../config/db-config")
const { compareSync } = require("bcrypt")

module.exports = {
    authorize: (req, content, notAbout) => (
        new Promise(async (resolve, reject) => {
            let result = await dbQuery(("SELECT user_id FROM content WHERE id = ?" + (notAbout ? " AND NOT roll = 'about'": "")), [content.id])
            if (((result[0]? result[0].user_id: null) === (req.user? req.user.id: undefined)) && req.isAuthenticated()) resolve()
            else reject()
        })
    ),
    authenticate: req => (
        new Promise((resolve, reject) => {
            if (req.isAuthenticated()) resolve()
            else reject()
        })
    ),
    compare: (password, hash) => (
        new Promise((resolve, reject) => {
            if (compareSync(password, hash)) resolve()
            else reject()
        })
    )
}