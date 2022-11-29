const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { registerUser, userEmailExist } = require("./db");
const cookieSession = require("cookie-session");
require("dotenv").config();
const authRouter = require("./routes/auth");
const resetRouter = require("./routes/reset");
const { PORT = 3001, SECRET } = process.env;

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
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(resetRouter);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});
