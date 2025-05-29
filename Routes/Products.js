const express = require("express");
const { Create, readAll, readSingle,Delete } = require("../Contrôleurs/ProductController");
const Router = express.Router();

//multer
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

Router.route("/")
     .post(upload.single('Photo'),Create)
     .get(readAll)

Router.route("/:id")
     .get(readSingle)
     .delete(Delete);
     
module.exports = Router;