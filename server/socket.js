const { getMessages, insertNewMessage, getUserInfo } = require("./db");

module.exports = (io) => {
    let loggedUser = [];
    try {
        io.on("connection", async (socket) => {
            console.log(`socket with the id ${socket.id} is now connected`);
            var userId = socket.request.session.user_id;

            loggedUser.push({ userId, socketId: socket.id });
            console.log("loge", loggedUser);
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
                        `New request from ${sender.firstname}${sender.lastname}`
                    );
                }
            });

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
                loggedUser = loggedUser.filter((user) => {
                    return user.socketId !== socket.id;
                });
            });
        });
    } catch (err) {
        console.log("Error : ", err.message);
    }
};
