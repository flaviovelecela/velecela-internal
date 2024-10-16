import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './AIPage.css';

const Chatbot = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);  // Track chatbox open state
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef(null);
  
  const toggleChat = () => {
    setIsOpen(prevState => !prevState);  // Toggle chatbox visibility
  };

  // Handle dragging
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = chatboxRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - position.x;
      const newY = e.clientY - position.y;

      // Update chatbox position
      chatboxRef.current.style.left = `${newX}px`;
      chatboxRef.current.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position.x, position.y]);

  // Function to format messages for code blocks
  const formatMessage = (message) => {
    return message
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')  // Multi-line code
      .replace(/`([^`]+)`/g, '<code>$1</code>');  // Inline code
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Append the user's message
    const newMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");  // Clear the input

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4o",  // Ensure the model name is correct
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input }
          ],
          max_tokens: 700,
          temperature: 0.5
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          }
        }
      );

      const botResponse = response.data.choices[0].message.content.trim();
      const formattedResponse = formatMessage(botResponse);

      // Append the bot's formatted message
      const newBotMessage = { text: formattedResponse, sender: "bot", isFormatted: true };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);

    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chatbot Icon - click to toggle the chatbox */}
      <div className="chatbot-icon" onClick={toggleChat}>
        <img
          src="https://img.icons8.com/color/48/000000/chat--v1.png"
          alt="Chatbot Icon"
        />
      </div>

      {/* Conditionally render the chatbox if isOpen is true */}
      {isOpen && (
        <div
          ref={chatboxRef}
          className="chatbox"
        >
          <div className="chatbox-header" onMouseDown={handleMouseDown}>
            <h3>Admin Chat</h3>
            <button onClick={toggleChat}>Close</button>
          </div>

          <div className="chatbox-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "bot" ? "message-bot" : "message-user"}
              >
                {/* Render formatted messages if applicable */}
                {msg.isFormatted ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            ))}
          </div>

          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
