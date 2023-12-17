import React, { useState } from "react";
import "./chatbot.scss";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatbotProps {
  onChatbotSubmit: (message: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onChatbotSubmit }) => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const addUserMessage = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: true }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    addUserMessage(input);
    onChatbotSubmit(input);

    setInput("");
  };

  return (
    <section id="chatbot" style={{ display: "none" }}>
      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.isUser ? "user-message" : "bot-message"}
          >
            {message.text}
          </div>
        ))}
        <img id="image" src="/artificial-intelligence.png" alt="Chatbot" />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
    </section>
  );
};

export default Chatbot;
