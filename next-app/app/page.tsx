// pages/chat.tsx
"use client"
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

interface Message {
  text: string;
  timestamp: number;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    setMessages([...messages, { text: newMessage, timestamp: Date.now() }]);
    setNewMessage('');
  };

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-scroll p-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-md ${
              index % 2 === 0 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
            } shadow-md`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center bg-white border-t border-gray-200 shadow-md">
        <input
          type="text"
          className="flex-1 border rounded p-3 mr-2 focus:outline-none text-gray-800"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
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
