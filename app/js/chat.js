
const socket = io.connect();
socket.on("connect", () => {

    document.getElementById("my_id").innerHTML = socket.id;

    socket.on("receive_message", (msg) => {
        message = document.getElementById("received_text_area").innerText;
        message = msg;
        document.getElementById("received_text_area").innerText = message;
    });

    socket.on("request_accepted", (room,msg) => {
        alert(msg)
        document.getElementById("received_text_area").innerText = msg;
        socket.emit("accept_join",document.getElementById("username").value,room,(err) => {
            if (err) {
                return alert(err);
            }
        });
    });

    socket.on("request_received", (s_s_i,msg) => {

        const b1 = document.createElement("button");
        const b2 = document.createElement("button");
        b1.setAttribute('value', '1');
        b1.setAttribute('onclick', 'req_decision(this.value)');
        b2.setAttribute('onclick', 'req_decision(this.value)');
        b2.setAttribute('value', '0');
        b1.innerHTML = "Yes";
        b2.innerHTML = "No";

        document.getElementById("request_area").appendChild(b1);
        document.getElementById("request_area").appendChild(b2);
        document.getElementById("send_socket_id").value = s_s_i;
        document.getElementById("received_text_area").innerText = msg;
    });

    socket.on("disconnect",document.getElementById("send_socket_id").value,(err) => {
        //document.getElementById("received_text_area").innerText = err;
        if (err) {
            return alert(err);
        }
    });
});


function req_decision(v)
{
 if(v==1)
 {
    request_reply("Yes! Let's talk...")
 }
 else
 {
    request_reply("Yes! Let's talk...")
 }

}

function request_to_connect()
{
    rec_socket_id = document.getElementById("send_socket_id").value;
    username = document.getElementById("username").value;
    my_s_id = document.getElementById("my_id").innerHTML;
    socket.emit("request_to_connect", username,my_s_id,rec_socket_id,(err) => {
        if (err) {
            return alert(err);
        }
    });
}

function request_reply(message)
{
    username = document.getElementById("username").value;
    rec_socket_id = document.getElementById("send_socket_id").value;
    socket.emit("request_decision",username,rec_socket_id,message, (err) => {
        if (err) {
            return alert(err);
        }
    });
}

function send_msg()
{
    mess = document.getElementById("msgbox").value;
    username = document.getElementById("username").value;
    rec_socket_id = document.getElementById("send_socket_id").value;
    socket.emit("send_message",username,rec_socket_id,mess, (err) => {
        if (err) {
            return alert(err);
        }
    });
}