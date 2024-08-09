import React, { useState, useRef } from 'react';

function SpeechToText() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleListen = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Error occurred in recognition: ', event.error);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (!isListening) {
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
    }
    
    setIsListening(prevState => !prevState);
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={handleListen}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>Transcribed Text: {text}</p>
    </div>
  );
}

export default SpeechToText;
