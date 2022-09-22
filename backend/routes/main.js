const path = require("path")

module.exports = (app)=>{
    app.get("/image/:image", (req, res)=>{
        res.sendFile(path.join(__dirname, '../files/img/') + req.params.image)
    })

    app.get("/*", (req,res)=>{
        res.sendFile(path.join(__dirname, '../../Frontend/build/index.html'))
    })
}