import { useState } from "react";
import ChatInput from "../components/chat/ChatInput";
import MessageList from "../components/chat/MessageList";
import { sendChatMessage } from "../services/chatApi";
import TypingIndicator from "../components/TypingIndicator";
import type { ChatMessage, ChatMessageHistory } from "../types/chat.types";

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<ChatMessageHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      role: "user" as ChatMessage["role"],
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await sendChatMessage(message, history);

      const botMessage: ChatMessage = {
        role: "bot" as ChatMessage["role"],
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
      setHistory((prev) => [
        ...prev,
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: data.reply }] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot" as ChatMessage["role"],
          text: "Something went wrong while talking to the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetMessage = () => {
    setMessages([]);
    setHistory([]);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>AI Knowledge Support Agent</h1>

      <div style={styles.chatBox as React.CSSProperties}>
        <MessageList messages={messages} />
        {loading && <TypingIndicator />}
      </div>

      <ChatInput
        onSend={handleSendMessage}
        loading={loading}
        onReset={handleResetMessage}
      />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
  },
  chatBox: {
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    minHeight: "400px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "16px",
    background: "#fff",
  },
};

export default ChatPage;
