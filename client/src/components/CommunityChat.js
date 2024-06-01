import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import '../css/CommunityChat.css';

import UserContext from '../context/UserContext.js';

const socket = io('/'); // No need to specify URL due to proxy

const CommunityChat = () => {
  const userDetails = useContext(UserContext);
  const { id } = useParams(); // Community ID from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = userDetails.user.accessToken;
    setUserId(userDetails.user._id);
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/community/${id}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Adjust if token is stored differently
          },
        });
        setMessages(res.data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('message', (newMessage) => {
      if (newMessage.communityId === id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [id, userDetails.user.accessToken]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      const res = await axios.post(
        `/api/community/${id}/messages`,
        { userContent: message },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
        }
      });

      // Emit the message via WebSocket
      socket.emit('sendMessage', { ...res.data.data, communityId: id });

      // Clear the input field
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Community Chat</h2>
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg._id} className={`message-container ${msg.userId._id === userId ? 'user-message' : 'other-message'}`}>
            <p className="message-text">
              <strong>{msg.userId._id === userId ? 'You' : msg.userId.name}</strong>: {msg.userContent}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default CommunityChat;
