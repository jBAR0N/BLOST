const mysql = require('mysql')

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blost"
})

module.exports = {
    con: con,
    dbQuery: (query, vars) => (
        new Promise((resolve, reject) => {
            con.query(query, vars, (err, result)=>{
                if (err) reject(err)
                else resolve(result)
            })
        })
    )
}