const socket=io()

let textarea=document.querySelector('#textarea');
let message_arga=document.querySelector('.chat_area')

let name;
do{
    name = prompt("please enter you name");
}while(!name);

textarea.addEventListener("keyup",(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg={
        user : name,
        message : message.trim()
    }
    appenMessage(msg,'output');
    textarea.value="";
    scrollToBottom();

    socket.emit('message',msg);
}

function appenMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type;
    mainDiv.classList.add(className,'message');

    let markup=`
        <h4>${msg.user}</h4>
        <P> ${msg.message}</p>
    `;

    mainDiv.innerHTML=markup;

    message_arga.appendChild(mainDiv);
}

//recive message

socket.on('message',(msg)=>{
    //console.log(msg);
    appenMessage(msg,'incomming')
    scrollToBottom();
})

function scrollToBottom(){
    message_arga.scrollTop=message_arga.scrollHeight;
}