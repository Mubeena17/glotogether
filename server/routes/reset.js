const express = require("express");
const router = express.Router();
const {
    userEmailExist,
    storePasswordRestCode,
    verifyPasswordRestCode,
    updatePassword,
    verifyRestCode,
} = require("../db");
const code = require("../secretcode");
const { ses } = require("../ses");
const { hash, compare } = require("../bcrypt");

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
            sendEmail(resetData);
            return true;
        })
        .then((isCodeSend) => {
            console.log("HEllo ", isCodeSend);
            if (isCodeSend) {
                return res.json({
                    success: true,
                    message: "reset code send",
                });
            }
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: err.message || "something went worng",
            });
        });
});

router.post("/password/reset/verify", (req, res) => {
    let { email, code, password } = req.body;
    console.log("update verify req.body", req.body);
    verifyRestCode({ email })
        .then((dbcode) => {
            console.log("COde is ", dbcode, code);
            if (dbcode) {
                if (dbcode.code === code) {
                    console.log("code matches");
                    return hash(password);
                } else throw Error("Code doesnt matches");
            } else throw Error("Code Expired");
        })
        .then((password) => {
            console.log("hashing password");
            return updatePassword({ email, password });
        })
        .then((result) => {
            console.log("update password ", result);
            if (result) {
                console.log("pass updated");
                return res.json({
                    success: true,
                    message: "password updated",
                });
            } else throw Error("password not updated");
        })
        .catch((err) => {
            console.log("erre ", err.message);
            return res.json({
                success: false,
                message:
                    err.message || "something went wrong in password update",
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
        .catch((err) => {
            console.log("huhuhuh");
            return true;
        });
};
