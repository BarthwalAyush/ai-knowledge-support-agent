import type { ChatRole } from "../../types/chat.types";
import ReactMarkdown from "react-markdown";

interface MessageItemProps {
  role: ChatRole;
  text: string;
}

function MessageItem({ role, text }: MessageItemProps) {
  const isUser = role === "user";

  return (
    <div
      style={{
        ...styles.message,
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser ? "#dbeafe" : "#e5e7eb",
      }}
    >
      <div style={{ marginBottom: "8px" }}>
        <strong>{isUser ? "You" : "Agent"}</strong>
      </div>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

const styles = {
  message: {
    padding: "10px 14px",
    borderRadius: "10px",
    maxWidth: "70%",
    lineHeight: 1.5,
  },
};

export default MessageItem;
