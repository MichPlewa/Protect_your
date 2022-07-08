import React, { useState, useEffect, useMemo } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return <div>{minutes + ':' + seconds}</div>;
  };

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  useEffect(() => {
    if (time === 0) {
      if (status === 'work') {
        setTime(20);
        setStatus('rest');
      } else if (status === 'rest') {
        setTime(1200);
        setStatus('work');
      }
    }
  }, [time]);

  const stopTime = () => {
    setTimer(null);
    setTime(null);
    setStatus('off');
    clearInterval(timer);
  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === 'work' && <img src="./images/work.png" />}
      {status === 'rest' && <img src="./images/rest.png" />}
      {status !== 'off' && <div className="timer">{formatTime(time)}</div>}
      {status === 'off' && (
        <button className="btn" onClick={() => startTimer()}>
          Start
        </button>
      )}
      {status !== 'off' && (
        <button className="btn" onClick={() => stopTime()}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={() => closeApp()}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
