const express = require('express')
const enableWs = require('express-ws')

const app = express()
enableWs(app)

let time = 1000;
let temp = time;

let data = {
  "place1": "Boca Chica",
  "place2": "Mars",
  "time": time
}

app.get('/', (req, res) => {
  res.send("up");
})

app.ws('/data', (ws, req) => {
  ws.send(JSON.stringify(data));
  ws.close();
});

app.ws('/time', (ws, req) => {
  ws.on('message', message => {
    async function sendTime(){
      if(temp !== 0){
        ws.send(temp);
        temp--;
      } else {
        ws.send(temp);
        ws.close();
        clearInterval(sendTime);
      }
    }
    var sendTime = setInterval(sendTime, 1000);

    ws.on('close', () => {
      clearInterval(sendTime);
      temp = time;
    })
  })
})

app.listen(42069);
