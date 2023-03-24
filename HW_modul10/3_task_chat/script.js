const wsUri = "wss://echo-ws-service.herokuapp.com";

const output = document.querySelector(".get-area");
const btnSend = document.querySelector('.sendmessage-button');
const btnGeolocation = document.querySelector('.geomessage-button');
//const data = document.querySelector('.inpt').value;


//1. Отправка сообщений.

let websocket;
function writeToScreenMyMessage(message) {
    let pre = document.createElement('div');
    pre.className = "mymessage";
    pre.innerHTML = message;
    pre.style.overflowWrap = "break-word";
    output.appendChild(pre);
  };

function writeToScreenEchoMessage(message) {
    let pre = document.createElement('div');
    pre.className = "echomessage";
    pre.innerHTML = message;
    pre.style.overflowWrap = "break-word";
    output.appendChild(pre);
  };
 
  btnSend.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    
    websocket.onopen = function(evt) {
    console.log("CONNECTED");
    let message = document.querySelector('.inpt').value;
     writeToScreenMyMessage(message);
     websocket.send(message);
    };
    websocket.onclose = function(evt) {
      console.log("DISCONNECTED");
    };
    websocket.onmessage = function(evt) {
      writeToScreenEchoMessage(evt.data);
    };
    
    websocket.onerror = function(evt) {
      writeToScreenEchoMessage(
        '<span style="color: red;">ERROR:</span> ' + evt.data
      );
    };
  });
  
//   btnClose.addEventListener('click', () => {
    // websocket.close();
    // websocket = null;
//   });
  
// Определение геолокации.

// const mapLink = document.createElement('a');
// maplink.href = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}';
// maplink.title = 'Ссылка на карту';
// Функция, выводящая текст об ошибке
const error = () => {
  let pre = document.createElement('div');
  pre.className = "geomessage";
  pre.innerHTML = "Невозможно получить ваше местоположение"
  output.appendChild(pre);
    
}


// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let pre = document.createElement('div');
  pre.className = "geomessage";
  output.appendChild(pre);
  const mapLink   = document.createElement('a');
  mapLink.href = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}';
  mapLink.target ="_blank";
  mapLink.appendChild(document.createTextNode('Гео-локация'));
  pre.appendChild(mapLink);
};

btnGeolocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    let pre = document.createElement('div');
    pre.className = "geomessage";
    pre.innerHTML = 'Geolocation не поддерживается вашим браузером'
    output.appendChild(pre);
  
  } else {
     navigator.geolocation.getCurrentPosition(success, error);
  }
});


