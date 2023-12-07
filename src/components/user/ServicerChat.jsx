// ServicerChat.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ServicerChat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/servicer_chat/");
    
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <div>
        {messages.map((message) => (
          <p key={message.id}>
            <strong>{message.sender.email}:</strong> {message.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ServicerChat;
