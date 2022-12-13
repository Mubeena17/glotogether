const express = require("express");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const compression = require("compression");
const path = require("path");

require("dotenv").config();
const { PORT = 3001, SECRET } = process.env;

const cookieSession = require("cookie-session");
const authRouter = require("./routes/auth");
const resetRouter = require("./routes/reset");
const userInfoRouter = require("./routes/user");
const friendshipRouter = require("./routes/friendship");

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.static(path.join(__dirname, "uploads")));

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    sameSite: true,
});
app.use(cookieSessionMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(resetRouter);
app.use(userInfoRouter);
app.use(friendshipRouter);
app.get("/favicon.ico", function (req, res, next) {
    next();
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});

//get req.session from express
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

require("./socket")(io);
