const express = require("express");
const router = express.Router();

const {
    findFriendshipStatus,
    createFriendRequest,
    deleteFriendRequest,
    acceptFriendRequest,
    getFriendList,
} = require("../db");

//friendship status
router.get("/friendship/:id", async (req, res) => {
    let sender = req.session.user_id;
    let recipient = req.params.id;
    let response = await findFriendshipStatus(sender, recipient);

    //no database entry
    if (!response) {
        return res.json({
            status: false,
            isAccepted: false,
            amIsender: true,
        });
    } else {
        return res.json({
            status: true,
            isAccepted: response.accepted,
            amIsender:
                req.session.user_id === response.sender_id ? true : false,
        });
    }
});

router.post("/friendship/:id", async (req, res) => {
    let sender = req.session.user_id;
    let recipient = req.params.id;
    let response = await createFriendRequest(sender, recipient);

    if (response) {
        res.json({
            status: true,
            response: response.rows,
        });
    } else
        return res.json({
            status: false,
        });
});

router.delete("/friendship/:id", async (req, res) => {
    let sender = req.session.user_id;
    let recipient = req.params.id;

    let response = await deleteFriendRequest(sender, recipient);

    if (response) {
        res.json({
            status: true,
        });
    } else
        return res.json({
            status: false,
        });
});

router.put("/friendship/:id", async (req, res) => {
    let sender = req.session.user_id;
    let recipient = req.params.id;
    console.log("Put");
    let response = await acceptFriendRequest(sender, recipient);

    if (response) {
        console.log(response);
        res.json({
            status: true,
            user: response,
            isAccepted: response.accepted,
            amIsender:
                req.session.user_id === response.sender_id ? true : false,
        });
    } else
        return res.json({
            status: false,
        });
});
// no firend case
router.get("/myfriendlist", async (req, res) => {
    let list = await getFriendList(req.session.user_id);
    return res.json({
        data: list,
    });
});

module.exports = router;
