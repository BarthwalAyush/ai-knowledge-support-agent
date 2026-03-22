import { useState } from "react";
import type { ChatInputProps } from "../../types/chat.types";

function ChatInput({ onSend, onReset, loading = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    await onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Ask something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={styles.input}
        disabled={loading}
      />

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
      <button
        type="submit"
        onClick={onReset}
        style={styles.button}
        disabled={loading}
      >
        Reset
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    padding: "12px 18px",
    fontSize: "16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
  },
};

export default ChatInput;
