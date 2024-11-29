import React, { useState } from 'react';

function App() {
  // State variable to track the message
  const [message, setMessage] = useState('Hello, welcome to React!');

  // Function to update the message when the button is clicked
  const handleClick = () => {
    setMessage('You clicked the button!');
  };

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{message}</h1>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Click Me
      </button>
    </div>
  );
}

export default App;
