//get rooms

const socket = io();

socket.on("getAllRooms",(rooms) => {
    const uniqueRooms = new Set(rooms);

    rooms = [];
    for(let x of uniqueRooms.values()){
        rooms.push(x);     
    }

    const html = Mustache.render(rooms_template,{
        rooms:rooms
    });

    allActiveRooms.innerHTML += html;
});


//chat


const socket = io();

socket.on("message", (msg) => {

    const html = Mustache.render(message_template, {
        class: checkUser(msg.username),
        message: msg.message,
        username: msg.username,
        createdAt: moment(msg.createdAt).format("h:mm a")
    });

    messages.innerHTML += html;

    autoScroll();

});

socket.on("locationMessage", (msg) => {

    const html = Mustache.render(location_template, {
        class: checkUser(msg.username),
        message: msg.url,
        username: msg.username,
        createdAt: moment(msg.createdAt).format("h:mm a")
    });

    messages.innerHTML += html;

});

socket.on("getAlllUser", ({ room, users }) => {


    const html = Mustache.render(users_template, {
        title: room,
        users: users
    });

    chat__aside.innerHTML = html;
    chat__aside_small_size.innerHTML = html;

});

socket.emit("sendMessage", $inputValue.value, (err) => {
        if (err) {
            return console.log(err);
        }

        $submitMessageForm.lastElementChild.removeAttribute("disabled");
        $submitMessageForm.lastElementChild.style.opacity = "1";
    });


socket.emit('join', username, room, (err) => {

    if (err) {
        alert(err);
        location.href = "/";
    }

});