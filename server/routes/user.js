const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../db");

router.get("/user/info/:id", (req, res) => {
    console.log("#$#$#%$$^^$", req.params.id);
    getUserInfo(req.params.id).then((user) => {
        return res.json(user);
    });
});
module.exports = router;
