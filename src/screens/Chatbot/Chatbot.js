import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css'


const ChatComponent = ({ patientInfo }) => {
  const [messages, setMessages] = useState([]);
  const chatOutputRef = useRef(null);
  


  useEffect(() => {
    // Scroll to the bottom of the chat output on each message update
    chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
  }, [messages]);
  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const appendMessage = (message, sender) => {
    
    const messageElement = (
      <div key={messages.length} className={`message ${sender.toLowerCase()}`}>
        <div className="message-bubble" style={getStyle(sender)}>
          {message}
        </div>
      </div>
    );

    setMessages(prevMessages => [...prevMessages, messageElement]);
  };

  const getStyle = (sender) => {
    return sender === 'You'
      ? {
          backgroundColor: '#20B2AA',
          color: 'white',
          borderRadius: '8px',
          padding: '10px',
        }
      : {
          backgroundColor: '#8E8F88',
          color: 'white',
          borderRadius: '8px',
          padding: '10px',
        };
  };
  const sendMessage = async () => {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage !== '') {
      appendMessage(userMessage, 'You');

      const requestData = {
        userObject: {
          userInput: {
            message: userMessage,
          },
        },
      };
      userInput.value = ''; 
      try {
        // TODO: Replace localhost endpoint
        const response = await fetch(`http://localhost:5000/${patientInfo.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();
        const botMessage = data?.response || "Sorry, I couldn't understand that.";
        appendMessage(botMessage, 'Bot');
      } catch (error) {
        console.error('Error:', error);
      }

      userInput.value = '';
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  if (!patientInfo || !patientInfo.name) {
    alert("Please Login First");
    // TODO: Redirect to Login Page
  }
  return (
    <div className="chat-page-container">
        <div className="chat-container">
            <div className="chat-header">
                <h1>Personal Chat Assistant</h1>
            </div>
            <div className="chat-output" id="chat-output" ref={chatOutputRef}>
                {messages}
            </div>
            <div className="chat-input">
                <input
                type="text"
                id="user-input"
                placeholder="Type a message..."
                onKeyUp={handleKeyUp}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    </div>
  );
};

export default ChatComponent;
