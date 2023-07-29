const socket = io();

document.getElementById("my_id").innerHTML = socket.id;

socket.on("message", (msg) => {
    message = document.getElementById("received_text_area").innerText;
    message = msg;
    document.getElementById("received_text_area").innerText = message;
});

function send_msg()
{
    mess = document.getElementById("msgbox").value;
    rec_socket_id = document.getElementById("send_socket_id").value
    socket.emit("sendMessage", rec_socket_id,mess, (err) => {
        if (err) {
            return console.log(err);
        }
    });
}
