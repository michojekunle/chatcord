const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

socket.on('message', message => {
    console.log(message);

    outputMessage(message);

    // Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

// Message Submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    //Get message Text
    const msg = e.target.elements.msg.value;

    //Emitin gthe message to the server
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
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div);
}