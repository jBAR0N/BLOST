const multer = require('multer');
const uuid = require("uuid").v4
const path = require("path")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files/img')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const originalname = `${uuid()}${ext}`
        cb(null, originalname)
    }
})

const upload = multer({
    storage: storage
});

module.exports = upload