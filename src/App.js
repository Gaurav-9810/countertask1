import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputCount, setInputCount] = useState(0);

  // Use useEffect to start the interval when isRunning is true
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount <= 1) {
            // Stop the timer when it reaches 0
            setIsRunning(false);
            return 0;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCount(inputCount);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

  if (/^\d+$/.test(inputValue)) {
    const newCount = parseInt(inputValue, 10);
    setInputCount(newCount);
    setCount(newCount);
  }
  else{
    window.alert('enter only digits');
  }
  };

  return (
    <div>
      <h1>{count}</h1>
      <input
        
        placeholder='enter the time '
        
        onChange={handleInputChange}
      />

      <div className='flex flex-col items-center gap-3 my-3'>
        <p className='bg-green-400 text-white w-24 rounded-lg hover:bg-green-600 cursor-pointer' onClick={handleStart}>Start</p>
        <p className='bg-red-400 text-white w-24 rounded-lg hover:bg-red-600 cursor-pointer'  onClick={handleStop}>Stop</p>
        <p className='bg-yellow-200 text-white w-24 rounded-lg hover:bg-yellow-400 cursor-pointer' onClick={handleReset}>Reset</p>
      </div>
    </div>
  );
}

export default App;
