const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('message', message => {
    console.log(message);
})

// Message Submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    //Get message Text
    const msg = e.target.elements.msg.value;

    //Emitin gthe message to the server
    socket.emit('chatMessage', msg);
})