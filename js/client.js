const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const message = document.getElementById('msginput');
const msgcontainer = document.querySelector(".container");

const user = prompt("Enter your name : ");
var audio = new Audio('ting.mp3');

const append = (msg,pos)=>{
    const msgelement = document.createElement('div');
    msgelement.innerText = msg;
    msgelement.classList.add('msg');
    msgelement.classList.add(pos);
    msgcontainer.append(msgelement);
    audio.play();
    
};

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const msg = msginput.value;
    append(`You: ${msg}`,'right');
    socket.emit('send',msg);
    msginput.value='';
});
socket.emit("new-user-joined", user);

socket.on('user-joined', (user)=>{
    append(`${user} joined the chat`,'left');
});

socket.on('receive', (data)=>{
    append(`${data.name}: ${data.message}`,'left');
});

socket.on('left',(user)=>{
    console.log(user);
    append(`${user} left the chat`,'left');
});