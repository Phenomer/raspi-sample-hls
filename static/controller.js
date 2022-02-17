socket = null;

function connectWS(event){
    socket = new WebSocket('ws://' + location.hostname + ':8080/controller');
    socket.addEventListener('close', reconnect);
}

function reconnect(event){
    setTimeout(() => {connectWS();}, 5000);
}

function keyboardEvent(event){
    console.log(event);
    let data = {
        'type':    event.type,
        'keyCode': event.keyCode,
        'key':     event.key,
        'code':    event.code,
        'altkey':  event.altkey,
        'ctrlkey': event.ctrlkey,
        'metakey': event.metakey,
        'repeat':  event.repeat
    }
    socket.send(JSON.stringify(data));
    event.stopPropagation();
    event.preventDefault();
    return false;
}

function mouseButtonEvent(event){
    console.log(event);
    let data = {
        'type':    event.type,
        'button':  event.button,
        'buttons': event.buttons
    }
    socket.send(JSON.stringify(data));
    event.stopPropagation();
    event.preventDefault();
    return false;
}

function mouseMoveEvent(event){
    console.log(event);
    let data = {
        'type':   event.type,
        'movementX': event.movementX,
        'movementY': event.movementY
    }
    socket.send(JSON.stringify(data));
    event.stopPropagation();
    event.preventDefault();
    return false;
}

function wheelEvent(event){
    console.log(event);
    let data = {
        'type':   event.type,
        'deltaX': event.deltaX,
        'deltaY': event.deltaY,
        'deltaZ': event.deltaZ
    }
    socket.send(JSON.stringify(data));
    event.stopPropagation();
    event.preventDefault();
    return false;
}

function nullEvent(event){
    event.stopPropagation();
    event.preventDefault();
    return false;
}

function initHID(){
    let inputBox = document.getElementById('mainBox');

    inputBox.focus();
    ['mousedown', 'mouseup'].forEach((type)=>{
        inputBox.addEventListener(type, mouseButtonEvent);
    });
    ['mousemove'].forEach((type)=>{
        inputBox.addEventListener(type, mouseMoveEvent);
    });
    ['wheel'].forEach((type)=>{
        inputBox.addEventListener(type, wheelEvent);
    });
    ['keydown', 'keyup', 'keypress'].forEach((type)=>{
        inputBox.addEventListener(type, keyboardEvent);
    });
    ['contextmenu'].forEach((type)=>{
        inputBox.addEventListener(type, nullEvent);
    });
}

window.onload = ()=>{
    initHID();
    connectWS();
};
