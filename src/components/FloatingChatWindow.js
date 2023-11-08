import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './FloatingChatWindow.css';
import axios from 'axios';




const FloatingChatWindow = ({ patientId, closeChat }) => {
    const [currentId, setCurrentId] = useState(0);
    const [currentIdentity, setCurrentIdentity] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const ws = useRef(null);
    let C_ID = null;
    let C_IDENTITY = null;
    let otherSideId = patientId;
    let otherSideIdentity = 'patient';

    useEffect(() => {
        //Define WebSocket message event

        const fetchData = async () => {
            try {
                // 获取当前用户的ID和身份
                const response = await axios.get('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/chat/getCurrentId');
                C_ID = response.data.info.id;
                C_IDENTITY = response.data.identity;
                setCurrentId(response.data.info.id);
                setCurrentIdentity(response.data.identity);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        ws.current = new WebSocket('wss://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/chat/sendMessage');

        ws.current.onopen = () => {
            console.log("WebSocket connection opened");
        };

        ws.current.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            if (C_ID === parsedMessage.chatMessage.receiver && C_IDENTITY === parsedMessage.chatMessage.receiverIdentity) {
                setChatHistory(prevHistory => parsedMessage.chatMessage.message && [...prevHistory, parsedMessage.chatMessage]);
            }

        };

        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

        // return () => {
        //     if (ws.current) ws.current.close();
        // };

    }, []);





    const handleSendMessage = () => {

        if (inputMessage) {
            const message = {
                message: inputMessage,
                sender: currentId,
                receiver: otherSideId,
                senderIdentity: currentIdentity,
                receiverIdentity: otherSideIdentity,
            };
            console.log(message);
            ws.current.send(JSON.stringify(message));
            setChatHistory(prevHistory => [...prevHistory, message]);

            setInputMessage("");  // Clear the input field after sending
        }
    };

    return (
        <div className="floating-chat">

            <div className="chat-container" style={{ position: 'relative' }}>
                <IconButton
                    aria-label="close"
                    onClick={closeChat}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1, // Make sure it's above other elements
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <div className="chat-box">
                    <div className="chat-history">
                        {chatHistory && chatHistory.map(chatMessage => (
                            <div className={chatMessage.sender != currentId && chatMessage.sender_identity != currentIdentity ? 'chat-left' : 'chat-right'}>
                                {chatMessage.message}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Send a message..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
                {/* <button onClick={closeChat}>Close Chat</button> */}
            </div>
        </div>
    );
};

export default FloatingChatWindow;