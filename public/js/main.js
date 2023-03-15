const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Get username and room fro URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room);

const socket = io();

// Join Chatroom
socket.emit('joinRoom', { username, room });

// Message from server
socket.on('message', message => {
    console.log(message);

    outputMessage(message);

    // Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.on('roomUsers', ({room, users}) => {
    console.log(room, users);
    outputRoomName(room);
    outputRoomUsers(users);
})

// Add room name to DOM
function outputRoomName(room) {
    document.getElementById('room-name').innerText = room;
}

// Add room users to DOM
function outputRoomUsers(users) {
    const roomUsers = document.getElementById('users');
    roomUsers.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
}

// Message Submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    //Get message Text
    const msg = e.target.elements.msg.value;

    //Emiting the message to the server
    socket.emit('chatMessage', msg);

    // Clear and Focus on Input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output Message to the DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');

    div.innerHTML = `
    <p class="meta">${message.username}<span>&nbsp;${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div);
}