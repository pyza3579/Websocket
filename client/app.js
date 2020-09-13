const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('newUser', userName => addMessage('Chat Bot', userName + ' has joined the conversation!')),
socket.on('removeUser', userName => addMessage('Chat Bot', userName + ' has left the conversation... :( ')); //to nie dziala :(

let userName = '';

loginForm.addEventListener('submit', (event) => {
    login(event);
    event.preventDefault();
});

const login = event => {
  if(userNameInput.value === '') {
    alert('Write something first')
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
  socket.emit('join', userName);
};

addMessageForm.addEventListener('submit',(event) => {
  sendMessage(event);
  event.preventDefault();
});

function sendMessage (event){
  event.preventDefault();

  if(messageContentInput.value === '') {
      alert('You have fill the field!')
  } else {
      addMessage(userName, messageContentInput.value);
      socket.emit('message', { author: userName, content: messageContentInput.value })

      messageContentInput.value = '';
  } 
  
}

/*const sendMessage = event => { //po podlaczeniu socketow, co tu sie dzieje?

    let messageContent = messageContentInput.value;

    if(!messageContent.lenght) {
    alert('Write something first')
  } else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
  
}*/

const addMessage = (author, content) => {
  const message = document.createElement('li'); 
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName)message.classList.add('message--self');
  if(author === 'Chat Bot') message.classList.add('chat--bot');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};


