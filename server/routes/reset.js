const express = require("express");
const router = express.Router();
const { userEmailExist, storePasswordRestCode } = require("../db");
const code = require("../secretcode");
const { ses } = require("../ses");

router.post("/password/reset/start", (req, res) => {
    let { email } = req.body;
    console.log("email from server", email);
    userEmailExist(email)
        .then((user) => {
            console.log("Secret code to reset is : ", code.secretCode);
            return storePasswordRestCode({ email, code: code.secretCode });
        })
        .then((resetData) => {
            //send email
            console.log(2222222);
            return sendEmail(resetData);
        })
        .then((isCodeSend) => {
            console.log(3333333);
            if (isCodeSend) {
                return res.json({
                    success: true,
                    message: "reset code send",
                });
            } else throw Error("Not send");
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: err.message || "something went worng",
            });
        });
});

module.exports = router;

const sendEmail = (resetData) => {
    ses.sendEmail({
        Source: "Glo together <funky.chicken@spiced.academy>",
        Destination: {
            ToAddresses: ["mubeenahamza@gmail.com"],
        },
        Message: {
            Body: {
                Text: {
                    Data: `code is ${resetData.code}`,
                },
            },
            Subject: {
                Data: "Reset Password",
            },
        },
    })
        .promise()
        .then(() => true)
        //catch should be false
        .catch((err) => true);
};
