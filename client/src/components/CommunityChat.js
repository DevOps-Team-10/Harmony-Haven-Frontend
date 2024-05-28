import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import '../css/CommunityChat.css';

const socket = io('/'); // No need to specify URL due to proxy

const CommunityChat = () => {
  const { id } = useParams(); // Community ID from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/api/community/${id}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Adjust if token is stored differently
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
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      const newMessage = { userContent: message, userId: { _id: userId, name: 'You' } };

      // Update the local state with the new message immediately
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the input field
      setMessage('');

      // Send the message to the server
      const res = await axios.post(
        `/api/community/${id}/messages`,
        { userContent: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      // Emit the message via WebSocket
      socket.emit('sendMessage', { ...res.data.data, communityId: id });
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