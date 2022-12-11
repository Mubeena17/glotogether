const { getMessages, insertNewMessage } = require("./db");

module.exports = (io) => {
    let loggedUser = [];
    try {
        io.on("connection", async (socket) => {
            console.log(`socket with the id ${socket.id} is now connected`);
            var userId = await socket.request.session.user_id;
            console.log("userId: " + userId);

            //get data from db
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
            });
        });
    } catch (err) {
        console.log("Error : ", err.message);
    }
};
