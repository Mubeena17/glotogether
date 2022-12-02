const express = require("express");
const router = express.Router();
const {
    getUserInfo,
    updateProfilepic,
    updateBio,
    getUserList,
} = require("../db");

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

router.post("/user/updatebio", (req, res) => {
    console.log("9999999", req.body);
    if (req.body) {
        updateBio({ id: req.body.id, bio: req.body.bio })
            .then((row) => {
                if (row) {
                    return res.json({
                        success: true,
                        message: "bio updated",
                    });
                } else throw Error("No bio updated");
            })
            .catch((err) =>
                res.json({
                    success: true,
                    message: err.message,
                })
            );
    }
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

router.get("/userlist/:query", (req, res) => {
    console.log("query ", req.params.query);
    getUserList(req.params.query).then((user) => {
        return res.json(user);
    });
});

module.exports = router;
