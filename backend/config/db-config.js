const mysql = require('mysql')

module.exports = {
    dbQuery: (query, vars) => (
        new Promise((resolve, reject) => {
            mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "blost"
            }).query(query, vars, (err, result)=>{
                if (err) reject(err)
                else resolve(result)
            })
        })
    )
}