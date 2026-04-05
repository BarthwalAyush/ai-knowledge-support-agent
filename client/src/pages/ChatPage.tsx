import { useState, useRef, useEffect } from "react";
import ChatInput from "../components/chat/ChatInput";
import MessageList from "../components/chat/MessageList";
import { sendChatMessage } from "../services/chatApi";
import TypingIndicator from "../components/TypingIndicator";
import type { ChatMessage, ChatMessageHistory } from "../types/chat.types";

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<ChatMessageHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>AI</div>
          <h1 style={styles.heading}>Assistant</h1>
        </div>
        <button onClick={handleResetMessage} style={styles.resetBtn}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "6px" }}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Chat
        </button>
      </header>

      <main style={styles.main}>
        <div style={styles.chatWrapper}>
          <div style={styles.chatBox as React.CSSProperties}>
            <MessageList messages={messages} />
            {loading && (
              <div style={styles.loadingWrapper}>
                <TypingIndicator />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div style={styles.inputArea}>
            <ChatInput
              onSend={handleSendMessage}
              loading={loading}
              onReset={handleResetMessage}
            />
            <div style={styles.footerText}>
              AI Assistant can make mistakes. Consider verifying important
              information.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    backgroundColor: "#FFFFFF",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: "900px",
  },
  header: {
    height: "64px",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #F3F4F6",
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px",
  },
  heading: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#111827",
  },
  resetBtn: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#F3F4F6",
    color: "#111827",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
  },
  chatWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "800px",
    height: "100%",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    scrollBehavior: "smooth",
  },
  loadingWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
    paddingLeft: "44px", // to align with bot avatar
  },
  inputArea: {
    padding: "16px 24px",
    backgroundColor: "#FFFFFF",
  },
  footerText: {
    textAlign: "center",
    fontSize: "12px",
    color: "#9CA3AF",
    marginTop: "12px",
  },
};

export default ChatPage;
