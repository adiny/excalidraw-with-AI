import React, { useState, useEffect } from "react";
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

  const addBotMessage = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: false }]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prevMessages) => [...prevMessages, { text, isUser: true }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") return;

    // 유저가 보낸 메시지 추가
    addUserMessage(input);

    try {
      onChatbotSubmit(input);
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("챗봇 API 호출 실패");
      }

      const data = await response.json();
      const botResponse = data.message;
      addBotMessage(botResponse);
    } catch (error) {
      console.error("챗봇 API 호출 중 오류 발생:", error);
      addBotMessage("죄송합니다. 현재 서비스를 이용할 수 없습니다.");
    }

    // 입력 창 초기화
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
