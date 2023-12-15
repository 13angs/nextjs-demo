// pages/chat.js
"use client"
import { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, timestamp: Date.now() }]);
    setNewMessage('');
  };

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-scroll p-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, index) => {
          const ind = index
          return (
            <div
              key={ind}
              className={`mb-2 p-3 rounded-md ${
                index % 2 === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
              } shadow-md`}
            >
              <p>{message.text}</p>
            </div>
          )
        })}
      </div>
      <div className="p-4 flex items-center bg-white border-t border-gray-200 shadow-md">
        <input
          type="text"
          className="flex-1 border rounded p-3 mr-2 focus:outline-none text-gray-800"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
