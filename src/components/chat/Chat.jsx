
// // Chat.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8000/ws/chat/");
    
//     socket.onopen = () => {
//       console.log("WebSocket connection established.");
//     };

//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket connection closed.");
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (inputValue.trim() === "") {
//       return;
//     }

//     const newMessage = {
//       content: inputValue,
//     };

//     try {
//       const response = await axios.post("http://localhost:8000/api/messages/", newMessage);
//       setMessages((prevMessages) => [...prevMessages, response.data]);
//       setInputValue("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((message) => (
//           <p key={message.id}>
//             <strong>{message.sender.email}:</strong> {message.content}
//           </p>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';
import instance from '../../utils/axios';
import hero from '../../assets/hero.png';
import { useSelector } from 'react-redux';

const Chat = () => {
  const [recipient, setRecipient] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();
  const userData = useSelector((state) => state.user);
  console.log('userData:', userData);
  const socketRef = useRef(null);

  const senderId = userData.user_id;
  const recipientId = recipient ? recipient.id : '';

  useEffect(() => {
    if (roomId) {
      // Establish a WebSocket connection
      socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${senderId}/${recipientId}/`);

      // Handle incoming WebSocket messages
      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      // Fetch existing messages for the chat
      instance
        .get(`/chat/rooms/${senderId}/${recipientId}/messages/list/`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId, senderId, recipientId]);
  console.log('senderId:', senderId);
  const sendMessage = () => {
    if (!recipient) {
      toast.error('Please select a recipient to chat with.', { duration: 5000 });
      return;
    }

    const message = {
      content: newMessage,
      sender: senderId,
      recipient: recipientId,
    };

    instance
      .post(`/chat/rooms/${senderId}/${recipientId}/messages/send/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }

    setNewMessage('');
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch user data for the sidebar (you can replace this with your own implementation)
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    // Fetch user data
    instance
      .get('/chat/accounts-list/')
      .then((response) => {
        setRecipients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="flex h-screen rounded-md bg-gray-200">
      {/* Chat sidebar */}
      <div className="flex flex-col bg-gray-200 h-screen w-1/4 border-r-2 border-gray-300">
        <h2 className="text-xl font-bold p-4 bg-gray-700 text-white">Chat</h2>
        <ul className="flex-grow overflow-y-auto">
          {Array.isArray(recipients) && recipients.length > 0 ? (
            recipients.map((user) => (
              <li
                key={user.id}
                className={`flex items-center py-3 px-4 cursor-pointer ${
                  recipient && recipient.id === user.id ? 'bg-gray-300' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setRecipient(user);
                  const roomId = `${senderId}${user.id}`;
                  setRoomId(roomId);
                }}
              >
                <div className="flex-shrink-0 mr-3 mt-1">
                  <Avatar
                    src={hero}
                    alt="User Avatar"
                    size="md"
                    className="rounded-full w-12 h-12 object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-start ms-3 text-lg font-semibold">{user.first_name}</h3>
                </div>
                {/* You can add online/offline status indicators here */}
              </li>
            ))
          ) : (
            <p>No recipients found.</p>
          )}
        </ul>
      </div>

      {/* Chat component */}
      <div className="flex-grow">
        <div className="flex flex-col h-screen">
          {/* Chat header */}
          <div className="py-4 px-6 bg-gray-700 text-white">
            <h2 className="text-xl font-bold">
              {recipient ? `Chat with ${recipient.first_name}` : 'Select a recipient'}
            </h2>
          </div>
          {/* Chat messages */}
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={`flex ${
                    message.sender === senderId ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`${
                      message.sender === senderId
                        ? 'bg-green-500 text-white self-end'
                        : 'bg-blue-500 text-white self-start'
                    } py-2 px-4 rounded-lg max-w-md`}
                  >
                    <div className="flex items-center">
                      {message.sender === senderId ? (
                        <>
                          {message.content && (
                            <div className="mr-3">{message.content}</div>
                          )}
                          <Avatar
                            src={hero}
                            alt="avatar"
                            size="xs"
                            className='rounded-full h-6 w-6'
                          />
                        </>
                      ) : (
                        <>
                          <Avatar
                            src={hero}
                            alt="avatar"
                            size="xs"
                            className="mr-3 rounded-full h-6 w-6"
                          />
                          {message.content && (
                            <div>{message.content}</div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
          </div>
          {/* Chat input */}
          <div className="py-4 px-6 bg-gray-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-400 rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

