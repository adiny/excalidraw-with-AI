import React, { useState } from "react";
import { MagicIcon } from "../icons";
import "./Chatbot.scss";

interface ChatbotProps {
  onChatbotSubmit: (message: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onChatbotSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() === "") {
      return;
    }

    onChatbotSubmit(input);

    setInput("");
  };

  return (
    <section id="chatbot">
      <form className="chat_form" onSubmit={handleSubmit}>
        <input
          className="chat_input"
          type="textarea"
          value={input}
          placeholder="텍스트로 결과물을 수정할 수 있습니다."
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat_button" type="submit">
          <div className="icon">{MagicIcon}</div>
        </button>
      </form>
    </section>
  );
};

export default Chatbot;
