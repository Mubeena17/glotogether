const { getMessages, insertNewMessage, getUserInfo } = require("./db");

module.exports = (io) => {
    let loggedUser = [];
    try {
        io.on("connection", async (socket) => {
            console.log(`socket with the id ${socket.id} is now connected`);
            var userId = socket.request.session.user_id;

            loggedUser.push({ userId, socketId: socket.id });

            //friend request notification
            socket.on("Friendrequest", async (receiverId) => {
                console.log(
                    "sender, recieverID",
                    socket.request.session.user_id,
                    receiverId
                );
                let reciever = loggedUser.find((user) => {
                    return user.userId == receiverId;
                });

                if (reciever) {
                    let sender = await getUserInfo(
                        socket.request.session.user_id
                    );
                    io.to(reciever.socketId).emit(
                        "newRequest",
                        `New friend request from ${sender.firstname}${sender.lastname}`
                    );
                }
            });

            //online user list
            emitOnlineuserlist(loggedUser, socket);

            //public chat
            try {
                let message = await getMessages();
                socket.emit("chatMessage", message);
            } catch (err) {
                console.log("Error : ", err.message);
            }

            socket.on("message", async (data) => {
                console.log("Button from client clicenk", data);
                try {
                    let message = await insertNewMessage(userId, data);
                    console.log("messahe db", message);
                    io.emit("newMessage", message);
                } catch (err) {
                    console.log("Error : ", err.message);
                }
            });

            socket.on("disconnect", function () {
                counter = 0;
                console.log(
                    `socket with the id ${socket.id} is now disconnected`
                );
                let disconnectedUserid = loggedUser.find(
                    (user) => user.socketId == socket.id
                );
                loggedUser = loggedUser.filter((user) => {
                    return user.socketId !== socket.id;
                });
                io.emit("useroffline", disconnectedUserid);
            });
        });
    } catch (err) {
        console.log("Error : ", err.message);
    }

    const emitOnlineuserlist = (logged, socket) => {
        console.log("blaaa", socket.request.session);
        try {
            let onlineUser = logged.filter(
                (user, index, self) =>
                    index === self.findIndex((t) => t.userId === user.userId)
            );

            let onlineuserdata = onlineUser.map(async (user) => {
                return await getUserInfo(user.userId);
            });

            Promise.all(onlineuserdata).then((results) => {
                io.emit("onlineuser", results);
            });
        } catch (err) {
            console.log("ee", err.message);
        }
    };
};
