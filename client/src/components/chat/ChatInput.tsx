import { useState } from "react";
import type { ChatInputProps } from "../../types/chat.types";

function ChatInput({ onSend, loading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    await onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form as React.CSSProperties}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <button
          type="submit"
          style={styles.sendButton}
          disabled={loading || !message.trim()}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    // width: "100%",
    display: "flex",
    // justifyContent: "center",
    gap: "10px",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #E5E7EB",
    borderRadius: "32px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    padding: "16px 56px 16px 24px",
    fontSize: "15px",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "#111827",
  },
  sendButton: {
    position: "absolute",
    right: "8px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

export default ChatInput;
