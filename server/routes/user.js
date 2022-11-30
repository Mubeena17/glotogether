const express = require("express");
const router = express.Router();
const { getUserInfo, updateProfilepic } = require("../db");

const { uploader } = require("../uploadmiddleware");
const fs = require("fs");
const { S3 } = require("../s3");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
require("dotenv").config();

router.get("/user/info/:id", (req, res) => {
    getUserInfo(req.params.id).then((user) => {
        return res.json(user);
    });
});

router.post("/upload/profilepic", uploader.single("photo"), (req, res) => {
    if (req.file) {
        const { filename, mimetype, size, path } = req.file;

        const promise = S3.putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()
            .then((result) => {
                console.log("success");
                let profileurl = `https://s3.amazonaws.com/spicedling/${filename}`;

                const { id } = req.body;

                return updateProfilepic({
                    id,
                    profileurl,
                }).then((row) => {
                    unlinkFile(req.file.path);
                    return row;
                });
                //it worked!!!
            })

            .then((row) => {
                return res.json({
                    success: true,
                    message: "File upload successful",
                    profileurl: `https://s3.amazonaws.com/spicedling/${filename}`,
                });
            })
            .catch((err) => {
                // uh oh
                return res.json({
                    success: false,
                    message: err.message,
                });
            });
    } else {
        return res.json({
            success: false,
            message: "File upload failed",
        });
    }
});

module.exports = router;
