const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

loginForm.addEventListener('submit', (event) => {
    login(event);
    event.preventDefault();
});

const login = event => {
  if(userNameInput.value === '') {
    alert('You wrote no text')
  } else {
    userName=userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

addMessageForm.addEventListener('submit',(event) => {
  sendMessage(event);
  event.preventDefault();
});

const sendMessage = event => {
    if(messageContentInput.value === '') {
    alert('You wrote no text')
  } else {
    addMessage(userName, messageContentInput.value)
  }
  messageContentInput.value = '';
}

const addMessage = (author, content) => {
  const message = document.createElement('li'); 
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName)message.classList.add('message--self');

  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};