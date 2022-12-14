const express = require("express");
const router = express.Router();

const { userEmailExist, registerUser } = require("../db");
const { hash, compare } = require("../bcrypt");

const validate = (req, res, next) => {
    next();
};

router.post("/register", validate, (req, res) => {
    let { email, password, firstname, lastname } = req.body;
    if (!(firstname && lastname && email && password)) {
        return res.json({
            success: false,
            message: "All fields are mantory",
        });
    }
    userEmailExist(email)
        .then((user) => {
            if (user) {
                throw Error("Email exist");
            } else {
                return hash(password);
            }
        })
        .then((hashPassword) => {
            return registerUser({
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: hashPassword,
            });
        })
        .then((user) => {
            req.session.user_id = user.id;
            //stop passing password
            return res.json({
                success: true,
                message: "registration successful",
                user,
            });
        })
        .catch((error) => {
            return res.json({
                success: false,
                message: error.message || "Something went wrong try again",
            });
        });
});

router.post("/login", (req, res) => {
    let userid;
    const { email, password } = req.body;
    userEmailExist(email)
        .then((user) => {
            if (user) {
                userid = user.id;
                return compare(password, user.password);
            } else throw Error("No user with email exist");
        })
        .then((result) => {
            console.log("result pass", result);
            if (result) return true;
            else throw Error("Wrong password");
        })
        .then((result) => {
            req.session.user_id = userid;

            return res.json({
                success: true,
                message: "registration successful",
            });
        })
        .catch((err) => {
            return res.json({
                success: false,
                message: err.message,
            });
        });
});

router.get("/user/id.json", (req, res) => {
    if (req.session.user_id)
        return res.json({
            user_id: req.session.user_id,
        });
    return res.json({});
});

router.get("/logout", (req, res) => {
    req.session = null;
    return res.json({
        loggedout: true,
    });
});

module.exports = router;
