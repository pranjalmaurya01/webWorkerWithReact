import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import worker_script from './worker-file';

function App() {
  const [counter, setCounter] = useState(0);
  const [worker, setworker] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    let worker = new Worker(worker_script);
    worker.addEventListener('message', (event) => {
      console.log(event.data);
      setCounter(event.data);
    });
    setworker(worker);

    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>COUNTER : {counter}</p>
        <h4>{time}</h4>
        <button
          onClick={() => {
            worker.postMessage('forLOOP');
            setCounter('CALCULATING...');
          }}
        >
          START LONG WORK
        </button>
      </header>
    </div>
  );
}

export default App;
