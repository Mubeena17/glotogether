const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { registerUser, userEmailExist } = require("./db");
const cookieSession = require("cookie-session");
require("dotenv").config();

const { PORT = 3001, SECRET } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: "Im hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.get("/user/id.json", (req, res) => {
    //console.log(req.session.user_id);
    return res.json({
        user_id: req.session.user_id,
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    return res.json({
        loggedout: true,
    });
});

app.post("/register", (req, res) => {
    let { email, password, firstname, lastname } = req.body;
    registerUser({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
    }).then((result) => {
        console.log("result from login ", result);
        req.session.user_id = result.id;
        res.json(result);
    });
});

app.post("/login", (req, res) => {
    console.log("#################################");
    console.log("");
    console.log(" hellooo ", req.body);
    console.log("");
    console.log("#################################");

    let { email, password } = req.body;
    userEmailExist(email)
        .then((user) => {
            if (user) {
                if (user.password == password) {
                    console.log("matceh");

                    return user;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        })
        .then((user) => {
            req.session.user_id = user.id;
            res.json(user);
        })
        .catch(() => {
            return false;
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
