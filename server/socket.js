module.exports = (io) => {
    let arr = [];
    let counter = 0;

    io.on("connection", function (socket) {
        console.log(`socket with the id ${socket.id} is now connected`);
        //arr.push({ socket: socket.id });

        //get data from db
        let message = ["hello", "world", "code", "open ai"];
        socket.emit("chatMessage", message);

        socket.on("message", (data) => {
            let newMessage = data;
            socket.emit("newMessage", newMessage);
        });

        socket.on("disconnect", function () {
            counter = 0;
            console.log(`socket with the id ${socket.id} is now disconnected`);
        });
    });
};
