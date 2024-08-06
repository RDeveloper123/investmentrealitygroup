const multer = require("multer")
const path = require("path")

const logostorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
const profileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
const storage = multer.diskStorage({

    filename: (req, file, cb) => {
        console.log(file.fieldname)
        // cb(null, "xxx.png")
        if (file.fieldname === "image") {
            cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        }
        else if (file.fieldname === "video") {
            cb(null, "video-" + file.fieldname + Date.now() + path.extname(file.originalname));
        }
    },
})
exports.Propertyupload = multer({ storage }).fields([
    { name: 'image', maxCount: 2 },
    { name: 'video', maxCount: 1 }
])

// exports.Propertyupload = multer({ storage: propertyStorage }).array("image",4)0.01
exports.upload = multer({ storage: logostorage }).single("logo")
exports.profileUpload = multer({ storage: profileStorage }).single("image")