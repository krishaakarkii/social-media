import React, { useState } from "react";
import "./Messages.css";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState(""); // For composing a new message
  const [messages, setMessages] = useState([
    { sender: "John Doe", content: "Hey, how are you?" },
    { sender: "You", content: "I'm good! How about you?" },
  ]);

  const users = [
    { id: 1, name: "John Doe", avatar: "/path/to/avatar1.png" },
    { id: 2, name: "Jane Smith", avatar: "/path/to/avatar2.png" },
    { id: 3, name: "Alex Johnson", avatar: "/path/to/avatar3.png" },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      setMessages([...messages, { sender: "You", content: newMessage }]);
      setNewMessage(""); // Clear the input
    }
  };

  return (
    <div className="messages-container">
      {/* Users List Section */}
      <div className="users-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser === user.id ? "active" : ""}`}
            onClick={() => setSelectedUser(user.id)}
          >
            <img src={user.avatar} alt={user.name} />
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        {selectedUser ? (
          <>
            <div className="chat-header">
              Chat with {users.find((u) => u.id === selectedUser)?.name}
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-bubble ${msg.sender === "You" ? "self" : ""}`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat">
            Select a user to start chatting or start a new message below.
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
