import { StrictMode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
const time = new WebSocket("wss://spacex.dwnlnk.repl.co/time");
const data = new WebSocket("wss://spacex.dwnlnk.repl.co/data");

function App() {
  const [completed, setCompleted] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [place1, setPlace1] = useState("");
  const [place2, setPlace2] = useState("");
  const [oTime, setOTime] = useState(null);
  function isMobile() {
    global.mobile = "ontouchstart" in document.documentElement;
  }

  useEffect(() => {
    isMobile();
  });

  time.onopen = () => {
    time.send("send");
  };

  time.onmessage = (e) => {
    var percent = Math.round(((oTime - e.data) / oTime) * 100);
    setCompleted(percent);
    setTimeLeft(e.data);
  };

  data.onmessage = (e) => {
    let rData = JSON.parse(e.data);
    setPlace1(rData.place1);
    setPlace2(rData.place2);
    setOTime(rData.time);
  };

  return (
    <>
      {!global.mobile ? (
        <>
          <div className="left">
            <img
              src="https://raw.githubusercontent.com/jordanreger/media/bb37cde58478f80d18912a963343be5dfac934e1/xLogo.svg"
              alt="spacex logo"
              id="xlogo"
              draggable="false"
            />
            <span id="e2eprogress-text">{completed}%</span>
            <div id="e2eprogress-container">
              <div id="e2eprogress" style={{ height: `${completed}%` }} />
            </div>
          </div>
          <div className="stack-2">
            <div className="box-1">
              <span id="title">TO/FROM</span>
              <div className="tofrom">
                <span id="place1">{place1}</span>
                <span id="to">to</span>
                <span id="place2">{place2}</span>
              </div>
            </div>
            <div className="box-2">
              <span id="title">TIME LEFT</span>
              <div className="tofrom">
                <span id="time-left">
                  {new Date(timeLeft * 1000).toISOString().substr(11, 8)}
                </span>
              </div>
            </div>
          </div>
          <div className="stack-1" />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
